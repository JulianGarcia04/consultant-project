"use server";

import { ProjectDtoSchema } from "@/models/Projects";
import { saveProject } from "@/services/projects";
import { formDataToObject } from "@/utils/formDataToObject";
import { revalidatePath } from "next/cache";

export const action = async (formData: FormData) => {
	try {
		const parseToObj = formDataToObject(formData);

		const newProject = ProjectDtoSchema.parse(parseToObj);

		await saveProject(newProject);

		revalidatePath(`/`);
	} catch (error) {
		console.error(error);
		throw new Error("Failed create a project");
	}
};
