"use client";

import React, { ChangeEventHandler, useState } from "react";
import {
	Modal,
	Label,
	TextInput,
	Textarea,
	Button,
	FileInput,
} from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import { action } from "@/actions/createReview";
import { MdOutlineErrorOutline } from "react-icons/md";
import ErrorBoundary from "./ErrorBoundary";
import { IoCloudUploadOutline } from "react-icons/io5";
import Image from "next/image";
import SubmitButton from "./ButtonSubmit";

const ErrorView = ({ closePopup }: { closePopup: (val: boolean) => void }) => {
	return (
		<div className="w-full h-72 flex flex-col justify-center items-center">
			<MdOutlineErrorOutline size={"40px"} color="#e02424" />
			<span className="text-red-600 text-lg my-3">
				Unknown Error. Please close dialog.
			</span>
			<Button className="bg-primary my-2" onClick={() => closePopup(false)}>
				Close dialog
			</Button>
		</div>
	);
};

interface Props {
	projectID: string;
}

function CreateReviewDialog({ projectID }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [imageUploadedUrl, setImageUploadedUrl] = useState<string | null>();

	const [imageUploaded, setImageUploaded] = useState<File>();

	const handlerOnChangeInputFile: ChangeEventHandler<HTMLInputElement> = (
		evt
	) => {
		const file = evt.target.files?.[0];

		if (!file) {
			setImageUploadedUrl(null);
			return;
		}

		const url = URL.createObjectURL(file);

		setImageUploadedUrl(url);

		setImageUploaded(file);
	};

	const handlerAction = async (formData: FormData) => {
		if (!imageUploaded) {
			return;
		}

		formData.append("image", imageUploaded);

		await action(formData, projectID);
	};

	return (
		<>
			<Button
				className="bg-primary hover:bg-purple-700"
				onClick={() => setIsModalOpen(true)}
			>
				<FaPlus className="mr-2" /> New Review
			</Button>

			<Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<ErrorBoundary fallback={<ErrorView closePopup={setIsModalOpen} />}>
					<>
						<Modal.Header className="bg-purple-600 text-white">
							<span>Create New Review</span>
						</Modal.Header>
						<form encType="multipart/form-data" action={handlerAction}>
							<Modal.Body>
								<div className="space-y-6">
									<div className="w-full h-64">
										<span className="text-primary">Image</span>
										{imageUploadedUrl == null ? (
											<Label
												htmlFor="dropzone-file"
												className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
											>
												<div className="flex flex-col items-center justify-center pb-6 pt-5">
													<IoCloudUploadOutline />
													<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
														<span className="font-semibold">
															Click to upload
														</span>{" "}
														or drag and drop
													</p>
													<p className="text-xs text-gray-500 dark:text-gray-400">
														SVG, PNG, JPG or GIF (MAX. 800x400px)
													</p>
												</div>
												<FileInput
													id="dropzone-file"
													accept=".png, .jpg, .jpeg, .webp, .svg"
													name="image"
													className="hidden"
													onChangeCapture={handlerOnChangeInputFile}
													required
												/>
											</Label>
										) : (
											<div className="flex justify-center h-full w-full">
												<Image
													src={imageUploadedUrl}
													alt="image uploaded"
													width={200}
													height={100}
													className="h-full object-scale-down"
												/>
											</div>
										)}
									</div>
									<div>
										<Label htmlFor="title" className="text-primary">
											Title
										</Label>
										<TextInput id="title" name="title" required />
									</div>
									<div>
										<Label htmlFor="description" className="text-primary">
											Description
										</Label>
										<Textarea id="description" name="description" />
									</div>
								</div>
							</Modal.Body>
							<Modal.Footer>
								<SubmitButton
									label="Create Review"
									color="primary"
									onChangeLoading={() => setIsModalOpen(false)}
								/>
								<Button color="gray" onClick={() => setIsModalOpen(false)}>
									Cancel
								</Button>
							</Modal.Footer>
						</form>
					</>
				</ErrorBoundary>
			</Modal>
		</>
	);
}

export default CreateReviewDialog;
