"use client";

import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Card, Badge } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
	createAt: string;
	description?: string;
	title: string;
	image: string;
	_id: string;
	projectID: string;
	review: boolean;
}

function ReviewCard({
	_id,
	projectID,
	createAt,
	title,
	description,
	image,
	review,
}: Props) {
	const router = useRouter();

	const handlerOnClick = async () => {
		router.push(`/project/${projectID}/review/${_id}`);
	};

	return (
		<Card
			className={`border-purple-200 w-96 h-80 ${
				review ? "cursor-not-allowed" : "cursor-pointer"
			}`}
			onClick={!review ? handlerOnClick : undefined}
		>
			<div className="w-full h-2/5">
				<Image
					src={image}
					alt={`${title}-image`}
					width={200}
					height={150}
					className="w-full h-full object-cover"
				></Image>
			</div>
			<h5 className="text-xl font-bold tracking-tight text-purple-900">
				{title}
			</h5>
			<p className="font-normal text-gray-700">{description}</p>
			<div className="flex items-center text-sm text-primary">
				<FaCalendarAlt className="mr-2" />
				{createAt}
			</div>
			{review ? (
				<Badge color="success">Reviewed</Badge>
			) : (
				<Badge color="warning">Reviewing</Badge>
			)}
		</Card>
	);
}

export default ReviewCard;
