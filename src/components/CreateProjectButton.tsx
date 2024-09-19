"use client";

import React, { useState } from "react";
import { Modal, Label, TextInput, Textarea, Button } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import { action } from "@/actions/createProject";
import { MdOutlineErrorOutline } from "react-icons/md";
import ErrorBoundary from "./ErrorBoundary";
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

function CreateProjectDialog() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<Button
				className="bg-primary hover:bg-purple-700"
				onClick={() => setIsModalOpen(true)}
			>
				<FaPlus className="mr-2" /> New Project
			</Button>

			<Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<ErrorBoundary fallback={<ErrorView closePopup={setIsModalOpen} />}>
					<>
						<Modal.Header className="bg-purple-600 text-white">
							<span>Create New Project</span>
						</Modal.Header>
						<form action={action}>
							<Modal.Body>
								<div className="space-y-6">
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
									label="Create Project"
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

export default CreateProjectDialog;
