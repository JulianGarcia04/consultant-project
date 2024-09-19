import { Avatar } from "flowbite-react";
import React from "react";
import Image from "next/image";
import RecordView from "./RecordView";

export interface CommentProps {
	avatar?: string;
	name: string;
	text?: string;
	image?: string;
	audio?: string;
	time: string;
}

function CommentCard({ avatar, name, text, time, image, audio }: CommentProps) {
	return (
		<div className="my-2">
			<div className="flex items-center">
				<Avatar img={avatar} rounded />
				<p className="font-semibold ml-2">{name}</p>
			</div>
			<div className="mt-1">
				<p className="text-sm text-justify text-gray-600">{text}</p>
				{audio && (
					<div className="bg-purple-100 rounded-full p-1 mt-2">
						<RecordView src={audio} withoutDelete></RecordView>
					</div>
				)}
				{image && (
					<Image
						src={image}
						alt="Comment attachment"
						className="mt-2 rounded-lg"
						width={120}
						height={120}
					/>
				)}
				<div className="flex items-center space-x-2 mt-1">
					{/* <Button size="xs">Reply</Button> */}
					<span className="text-xs text-gray-500">{time}</span>
				</div>
			</div>
		</div>
	);
}

export default CommentCard;
