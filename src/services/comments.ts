import { db } from "@/firebase";
import {
	CommentSchema,
	Comment,
	CommentDtoSchema,
	CommentDto,
} from "@/models/Comment";

export const saveComments = async (
	projectID: string,
	reviewID: string,
	data: Omit<CommentDto, "time">
) => {
	const comment = CommentDtoSchema.parse(data);

	return db
		.collection(`projects/${projectID}/reviews/${reviewID}/comments`)
		.add(comment);
};

export const getComments = async (
	projectID: string,
	reviewID: string
): Promise<Comment[]> => {
	const snap = await db
		.collection(`projects/${projectID}/reviews/${reviewID}/comments`)
		.get();

	return snap.docs
		.filter((doc) => {
			return (
				doc.exists && CommentSchema.safeParse({ ...doc.data(), _id: doc.id })
			);
		})
		.map((doc) => {
			return CommentSchema.parse({ ...doc.data(), _id: doc.id });
		});
};

export const replyComment = async (
	parentCommentID: string,
	data: Omit<Comment, "_id">
) => {
	const comment = CommentSchema.omit({ _id: true }).parse(data);

	return db.collection(`/comments/${parentCommentID}/replies`).add(comment);
};
