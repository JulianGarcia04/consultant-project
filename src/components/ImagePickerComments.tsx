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
	disablePicker,
}: {
	comments: Comment[];
	image: string;
	projectID: string;
	reviewID: string;
	disablePicker?: boolean;
}) {
	const groupByCoordinates = groupBy(comments, ({ x, y }) => {
		return `${x}_${y}`;
	});

	return (
		<div className="relative w-full h-full">
			<ImagePicker
				className="relative"
				imageSrc={image}
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
				disablePicker={disablePicker}
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
								withoutReplay={disablePicker}
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
