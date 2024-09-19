import { toDate } from "@/utils/toDate";
import { z } from "zod";

const ReviewBaseSchema = z.object({
	image: z.string(),
	title: z.string(),
	description: z.string().optional(),
	reviewed: z.boolean().default(false),
});

export const ReviewSchema = ReviewBaseSchema.merge(
	z.object({
		_id: z.string(),
		createAt: z.preprocess(toDate, z.string()),
	})
);

export const ReviewDtoSchema = ReviewBaseSchema.merge(
	z.object({
		createAt: z.date().default(new Date()),
	})
);

export type Review = z.infer<typeof ReviewSchema>;

export type ReviewDto = z.infer<typeof ReviewDtoSchema>;
