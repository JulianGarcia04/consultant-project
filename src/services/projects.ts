import { db } from "@/firebase";
import {
	Project,
	ProjectSchema,
	ProjectDto,
	ProjectDtoSchema,
} from "@/models/Projects";

export const saveProject = (data: Omit<ProjectDto, "createAt">) => {
	const project = ProjectDtoSchema.parse(data);

	return db.collection("/projects").add(project);
};

export const getProjects = async (): Promise<Project[]> => {
	const snap = await db.collection("/projects").get();

	console.log("execute");

	return snap.docs
		.filter((project) => {
			return (
				project.exists &&
				ProjectSchema.safeParse({ ...project.data(), _id: project.id })
			);
		})
		.map((project) => {
			return ProjectSchema.parse({ ...project.data(), _id: project.id });
		});
};
