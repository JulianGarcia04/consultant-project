"use client";

import React from "react";
import ImagePicker from "./ImagePicker";
import { CommentCardWithInput } from "./CommentCardWithInput";
import { groupBy } from "lodash";
import { Comment } from "@/models/Comment";

function ImagePickerComments({
	comments,
	image,
	projectID,
	reviewID,
}: {
	comments: Comment[];
	image: string;
	projectID: string;
	reviewID: string;
}) {
	const groupByCoordinates = groupBy(comments, ({ x, y }) => {
		return `${x}_${y}`;
	});

	return (
		<div className="relative w-full h-full">
			<ImagePicker
				className="relative"
				imageSrc={image}
				height={520}
				width={1000}
				pointerComponent={(hide, setHide, x, y) =>
					hide ? (
						<CommentCardWithInput
							isOpen={hide}
							setIsOpen={setHide}
							projectID={projectID}
							reviewID={reviewID}
							positionX={x}
							positionY={y}
							disableCloseWithOnClick
						/>
					) : null
				}
			>
				{Object.entries(groupByCoordinates).map(([key, comments], idx) => {
					const [x, y] = key.split("_");
					return (
						<div
							key={key}
							style={{
								position: "absolute",
								top: `${y}px`,
								left: `${x}px`,
								zIndex: idx,
							}}
						>
							<CommentCardWithInput
								comments={comments}
								projectID={projectID}
								reviewID={reviewID}
								positionX={Number(x)}
								positionY={Number(y)}
							/>
							;
						</div>
					);
				})}
			</ImagePicker>
		</div>
	);
}

export default ImagePickerComments;
