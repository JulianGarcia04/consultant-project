import { toDate } from "@/utils/toDate";
import { z } from "zod";

const BaseSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
});

export const ProjectSchema = BaseSchema.merge(
	z.object({
		_id: z.string(),
		createAt: z.preprocess(toDate, z.string()),
	})
);

export const ProjectDtoSchema = BaseSchema.merge(
	z.object({
		createAt: z.date().default(new Date()),
	})
);

export type ProjectDto = z.infer<typeof ProjectDtoSchema>;

export type Project = z.infer<typeof ProjectSchema>;
