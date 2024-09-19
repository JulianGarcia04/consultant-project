import { db } from "@/firebase";
import { ReviewDto, ReviewDtoSchema, ReviewSchema } from "@/models/Review";

export const saveReview = async (
	projectID: string,
	data: Omit<ReviewDto, "createAt">
) => {
	const review = ReviewDtoSchema.parse(data);

	return db.collection(`/projects/${projectID}/reviews`).add(review);
};

export const getReviews = async (projectID: string) => {
	const snap = await db
		.collection(`/projects/${projectID}/reviews`)
		.orderBy("createAt")
		.get();

	return snap.docs
		.filter((doc) => {
			return (
				doc.exists && ReviewSchema.safeParse({ ...doc.data(), _id: doc.id })
			);
		})
		.map((doc) => {
			return ReviewSchema.parse({ ...doc.data(), _id: doc.id });
		});
};

export const getReviewByID = async (projectID: string, reviewID: string) => {
	const doc = await db.doc(`/projects/${projectID}/reviews/${reviewID}`).get();

	return ReviewSchema.parse({ ...doc.data(), _id: doc.id });
};

export const updateReview = async (
	projectID: string,
	reviewID: string,
	data: Partial<Omit<ReviewDto, "createAt" | "image">>
) => {
	const doc = db.doc(`/projects/${projectID}/reviews/${reviewID}`);

	return await doc.update(data);
};
