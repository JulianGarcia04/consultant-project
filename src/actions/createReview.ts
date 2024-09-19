"use server";

import { storage } from "@/firebase";
import { ReviewDtoSchema } from "@/models/Review";
import { saveReview } from "@/services/reviews";
import { formDataToObject } from "@/utils/formDataToObject";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export const action = async (formData: FormData, projectID: string) => {
	try {
		const { image: imageFile, ...parseToObj } = formDataToObject(formData);

		const image = imageFile as File;

		const bucket = storage.bucket();

		const path = `project/${projectID}/reviews/${randomUUID()}.${
			image.type.split("/")?.[1]
		}`;

		const file = bucket.file(path);

		const arraybuff = await image.arrayBuffer();

		const buff = Buffer.from(arraybuff);

		await file.save(buff, {
			public: true,
			predefinedAcl: "publicRead",
			metadata: {
				type: image.type,
				originalName: image.name,
				lastModified: image.lastModified,
			},
		});

		await file.makePublic();

		const metadata = await file.getMetadata();

		if (!metadata?.[0].mediaLink) {
			throw new Error("Failed to get media link");
		}

		const mediaLink = metadata[0].mediaLink as string;

		const review = ReviewDtoSchema.parse({ ...parseToObj, image: mediaLink });

		await saveReview(projectID, review);

		revalidatePath(`/project/${projectID}`);
	} catch (error) {
		console.error(error);
		throw new Error("Failed create a project");
	}
};
