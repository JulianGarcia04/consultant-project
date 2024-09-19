"use server";

import { updateReview } from "@/services/reviews";
import { revalidatePath } from "next/cache";

export const action = async (
	formData: FormData,
	projectID: string,
	reviewID: string
) => {
	try {
		await updateReview(projectID, reviewID, { reviewed: true });
		revalidatePath(`/project/${projectID}`);
	} catch (error) {
		console.error(error);
		throw new Error("Error change the data");
	}
};
