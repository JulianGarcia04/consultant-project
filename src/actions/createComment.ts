"use server";

import { CommentDtoSchema, CommentDto } from "@/models/Comment";
import { saveComments } from "@/services/comments";
import { formDataToObject } from "@/utils/formDataToObject";
import { revalidatePath } from "next/cache";
import { storage } from "@/firebase";
import { randomUUID } from "crypto";
import { cleanData } from "@/utils/cleanData";

export const action = async (
	formData: FormData,
	payload: {
		projectID: string;
		reviewID: string;
		positionX: number;
		positionY: number;
	}
) => {
	try {
		const { text, audio, image } = formDataToObject(formData);

		const { projectID, reviewID, positionX, positionY } = payload;

		const mediafile = (audio ?? image) as Blob | undefined;

		let fileUrl: string | undefined = undefined;

		if (mediafile) {
			const bucket = storage.bucket();

			const path = `project/${projectID}/reviews/${reviewID}/comments/media-files/${randomUUID()}.${
				mediafile.type.split("/")?.[1]
			}`;

			const file = bucket.file(path);

			const arraybuff = await mediafile.arrayBuffer();

			const buff = Buffer.from(arraybuff);

			await file.save(buff, {
				public: true,
				predefinedAcl: "publicRead",
				metadata: {
					type: mediafile.type,
				},
			});

			await file.makePublic();

			const metadata = await file.getMetadata();

			if (!metadata?.[0].mediaLink) {
				throw new Error("Failed to get media link");
			}

			const mediaLink = metadata[0].mediaLink as string;

			fileUrl = mediaLink;
		}

		const data: Omit<CommentDto, "time"> = {
			text: text as string,
			name: "Anonimous",
			audio: audio ? fileUrl : undefined,
			image: image ? fileUrl : undefined,
			x: positionX,
			y: positionY,
		};

		const sanitizeData = cleanData(data);

		const comment = CommentDtoSchema.parse(sanitizeData);

		await saveComments(projectID, reviewID, comment);

		revalidatePath(`/project/${projectID}/review/${reviewID}`);
	} catch (error) {
		console.error(error);
		throw new Error("Failed create a project");
	}
};
