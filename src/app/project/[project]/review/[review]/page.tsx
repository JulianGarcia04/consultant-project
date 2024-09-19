import {
	// Breadcrumb,
	// BreadcrumbItem,
	Card,
	Progress,
	Button,
} from "flowbite-react";
import { FaEye, FaComments } from "react-icons/fa";
// import { BsSlash } from "react-icons/bs";
import CommentCard from "@/components/CommentCard";
import { getComments } from "@/services/comments";
import { getReviewByID } from "@/services/reviews";
import ImagePickerComments from "@/components/ImagePickerComments";
import { action } from "@/actions/finishReview";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/ButtonSubmit";

interface Props {
	params: {
		project: string;
		review: string;
	};
}

// const BreadcrumbCustomTheme: CustomFlowbiteTheme["breadcrumb"] = {
// 	item: {
// 		chevron: "hidden",
// 		icon: "mr-0 text-primary",
// 	},
// };

export default async function Page({ params }: Props) {
	const currentReview = await getReviewByID(params.project, params.review);

	const comments = await getComments(params.project, params.review);

	const handlerAction = async (formData: FormData) => {
		"use server";
		await action(formData, params.project, params.review);
		redirect(`/project/${params.project}`);
	};

	return (
		<div className="flex flex-row p-2 justify-between min-h-screen">
			<div className="flex flex-col w-[72%] my-">
				{/* <div className="flex flex-row w-full mx-auto">
					<div className="flex items-center mb-4">
						<Breadcrumb>
							<Breadcrumb.Item icon={FaArrowLeft}>
								<span className="text-primary">Proyectos</span>
							</Breadcrumb.Item>
							<BreadcrumbItem
								theme={BreadcrumbCustomTheme?.item}
								icon={BsSlash}
								className="hi"
							>
								<span className="text-primary">
									Conoce los nuevos productos de pepsico
								</span>
							</BreadcrumbItem>
							<BreadcrumbItem
								theme={BreadcrumbCustomTheme?.item}
								icon={BsSlash}
							>
								<span className="text-primary">Revisión de proyecto</span>
							</BreadcrumbItem>
						</Breadcrumb>
					</div>
				</div> */}
				<h2 className="text-2xl font-bold mb-4">{currentReview.title}</h2>
				<div className="h-4/6 w-full q-my-sm">
					<ImagePickerComments
						comments={comments}
						image={currentReview.image}
						projectID={params.project}
						reviewID={params.review}
					/>
				</div>
				<Card
					theme={{
						root: { children: "flex justify-between items-center p-4" },
					}}
					className="mt-4"
				>
					<div className="w-2/5">
						<Progress
							progress={90}
							size="lg"
							color="purple"
							className="w-full"
						/>
					</div>
					<div className="flex space-x-2">
						<Button color="gray" pill>
							<FaEye />
						</Button>
						<Button color="gray" pill>
							<FaComments />
						</Button>
						<form action={handlerAction}>
							<input name="itemId" className="hidden" />
							<SubmitButton label="Finalizar revisión" color="primary" />
						</form>
					</div>
				</Card>
			</div>

			<Card
				theme={{
					root: { children: "flex flex-col p-4" },
				}}
				className="w-3/12"
			>
				<h3 className="text-lg font-semibold mb-2">Comentarios</h3>
				<p className="text-gray-500 mb-4">No hay comentarios por el momento</p>
				<div className="space-y-4">
					{comments.map((comment, index) => (
						<CommentCard
							name={comment.name}
							avatar={comment.avatar}
							text={comment.text ?? ""}
							time={comment.time}
							audio={comment.audio}
							image={comment.image}
							key={index}
						/>
					))}
				</div>
			</Card>
		</div>
	);
}
