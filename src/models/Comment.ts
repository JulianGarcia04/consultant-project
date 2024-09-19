import { toDate } from "@/utils/toDate";
import { z } from "zod";

const BaseCommentSchema = z.object({
	name: z.string(),
	avatar: z.string().url().optional(),
	text: z.string().optional(),
	x: z.number(),
	y: z.number(),
	image: z.string().url().optional(),
	audio: z.string().url().optional(),
});

export const CommentSchema = BaseCommentSchema.merge(
	z.object({
		_id: z.string(),
		time: z.preprocess(toDate, z.string()),
	})
);

export const CommentDtoSchema = BaseCommentSchema.merge(
	z.object({
		time: z.date().default(new Date()),
	})
);

export type CommentDto = z.infer<typeof CommentDtoSchema>;

export type Comment = z.infer<typeof CommentSchema>;
