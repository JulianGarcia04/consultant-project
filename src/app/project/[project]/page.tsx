import React from "react";
import ReviewCard from "@/components/ReviewCard";
import { getReviews } from "@/services/reviews";
import CreateReviewDialog from "@/components/CreateReviewButton";

interface Props {
	params: {
		project: string;
	};
}

export default async function Page({ params }: Props) {
	const reviews = await getReviews(params.project);

	return (
		<div className="container mx-auto p-4 bg-gray-100 min-h-screen">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-primary">Reviews</h1>
				<CreateReviewDialog projectID={params.project} />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{reviews.length === 0 ? (
					<span className="italic"> Does not has reviews </span>
				) : (
					reviews.map((review) => (
						<ReviewCard
							key={review._id}
							_id={review._id}
							projectID={params.project}
							title={review.title}
							description={review.description}
							createAt={review.createAt}
							image={review.image}
							review={review.reviewed}
						/>
					))
				)}
			</div>
		</div>
	);
}
