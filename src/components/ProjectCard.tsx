"use client";

import React from "react";
import { Card } from "flowbite-react";
import { FaCalendarAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Props {
	_id: string;
	title: string;
	createAt: string;
	description?: string;
}

function ProjectCard({ _id, title, createAt, description }: Props) {
	const router = useRouter();

	const handlerOnClick = () => {
		router.push(`/project/${_id}`);
	};

	return (
		<Card className="border-purple-200 cursor-pointer" onClick={handlerOnClick}>
			<h5 className="text-xl font-bold tracking-tight text-purple-900">
				{title}
			</h5>
			<p className="font-normal text-gray-700">{description}</p>
			<div className="flex items-center text-sm text-primary">
				<FaCalendarAlt className="mr-2" />
				{createAt}
			</div>
		</Card>
	);
}

export default ProjectCard;
