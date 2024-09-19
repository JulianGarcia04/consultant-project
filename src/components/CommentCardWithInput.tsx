import {
	Button,
	Card,
	TextInput,
	Textarea,
	Avatar,
	Label,
	FileInput,
} from "flowbite-react";
import CommentCard from "./CommentCard";
import { IoIosSend } from "react-icons/io";
import { CiMicrophoneOn, CiImageOn } from "react-icons/ci";
import { Comment } from "@/models/Comment";
import { action } from "@/actions/createComment";
import { useState } from "react";
import RecordView from "./RecordView";
import SubmitButton from "./ButtonSubmit";

interface Props {
	comments?: Comment[];
	isOpen?: boolean;
	setIsOpen?: (val: boolean) => void;
	disableCloseWithOnClick?: boolean;
	projectID: string;
	reviewID: string;
	positionX: number;
	positionY: number;
}

export function CommentCardWithInput({
	comments,
	isOpen,
	setIsOpen,
	projectID,
	reviewID,
	positionX,
	positionY,
	disableCloseWithOnClick,
}: Props) {
	const [isOpenProxy, setIsOpenProxy] = useState(false);

	const [useAudio, setUseAudio] = useState(false);

	const [useImage, setUseImage] = useState(false);

	const [audioPayload, setAudioPayload] = useState<Blob>();

	const cb = setIsOpen ?? setIsOpenProxy;

	const handlerOnClick = (e: { stopPropagation: () => void }) => {
		if (disableCloseWithOnClick) {
			return;
		}
		e.stopPropagation();
		cb(!(isOpen ?? isOpenProxy));
	};

	const handlerOnClickChangeToAudio = () => {
		setUseAudio(!useAudio);
	};

	const handlerOnRecodedAudio = (
		audioUrl: string,
		audioStream: MediaStream,
		audioBlob: Blob
	) => {
		setAudioPayload(audioBlob);
	};

	const handlerActionCreateComment = async (formData: FormData) => {
		if (audioPayload) {
			formData.append("audio", audioPayload);
		}

		await action(formData, {
			projectID,
			reviewID,
			positionX,
			positionY,
		});
		cb(false);
	};
	return (
		<Card className="max-w-sm" onClick={handlerOnClick}>
			{isOpen ?? isOpenProxy ? (
				<>
					{(comments?.length ?? 0) > 0 ? (
						<div>
							{comments?.map((comment, idx) => {
								return (
									<CommentCard
										name={comment.name}
										text={comment.text}
										avatar={comment.avatar}
										time={comment.time}
										audio={comment.audio}
										image={comment.image}
										key={idx}
									/>
								);
							})}
						</div>
					) : null}
					<div className="flex flex-col gap-4">
						{(comments?.length ?? 0) > 0 ? (
							<form
								method="POST"
								action={handlerActionCreateComment}
								className="flex flex-row justify-around w-full"
							>
								<TextInput
									id="comment"
									type="text"
									placeholder="Reply"
									className="w-4/5"
									name="text"
									required
									onClick={(e) => {
										e.stopPropagation();
										cb(true);
									}}
								/>
								<SubmitButton
									color="primary"
									className="rounded-3xl ml-2"
									icon={<IoIosSend color="white" />}
									onClick={(e) => {
										e.stopPropagation();
										cb(true);
									}}
								></SubmitButton>
							</form>
						) : (
							<form
								method="POST"
								action={handlerActionCreateComment}
								className="w-52"
							>
								<div className="flex flex-row justify-center">
									{useAudio ? (
										<RecordView onRecoded={handlerOnRecodedAudio} />
									) : useImage ? (
										<div>
											<div className="mb-2 block">
												<Label htmlFor="file-upload" value="Upload file" />
											</div>
											<FileInput
												id="file-upload"
												accept=".png, .jpg, .jpeg, .webp, .svg"
												name="image"
											/>
										</div>
									) : (
										<Textarea
											cols={20}
											name="text"
											placeholder="Write a comment"
										/>
									)}
								</div>
								<div className="flex flex-row justify-end w-full mt-3">
									<Button
										color="transparent"
										className="mr-1"
										onClick={handlerOnClickChangeToAudio}
									>
										<CiMicrophoneOn color={useAudio ? "#6c39f8" : undefined} />
									</Button>
									<Button
										color="transparent"
										className="mr-1"
										onClick={() => setUseImage(!useImage)}
									>
										<CiImageOn color={useImage ? "#6c39f8" : undefined} />
									</Button>
									<SubmitButton
										color="primary"
										className="rounded-2xl"
										icon={<IoIosSend color="white" />}
									></SubmitButton>
								</div>
							</form>
						)}
					</div>
				</>
			) : comments && comments?.length !== 0 ? (
				<Avatar.Group>
					{comments?.map((comment, idx) => {
						return <Avatar img={comment.avatar} key={idx} rounded stacked />;
					})}
				</Avatar.Group>
			) : null}
		</Card>
	);
}
