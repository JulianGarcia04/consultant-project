"use client";

import dynamic from "next/dynamic";
import { FaPlayCircle, FaRegStopCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";

const ReactMediaRecorder = dynamic(
	() => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
	{
		ssr: false,
	}
);

interface Props {
	src?: string;
	onRecoded?: (
		mediaUrl: string,
		audioStream: MediaStream,
		audioBlob: Blob
	) => void;
	withoutDelete?: boolean;
}

const RecordView = ({ src, onRecoded, withoutDelete }: Props) => {
	const [audioUrl, setAudioUrl] = useState<string>();

	const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

	useEffect(() => {
		if (!audioUrl || !audioStream) {
			return;
		}
		console.log(audioUrl);

		console.log(audioStream);
		if (!onRecoded) {
			return;
		}

		fetch(audioUrl).then((res) => {
			res.blob().then((blob) => {
				onRecoded(audioUrl, audioStream, blob);
			});
		});
	}, [audioUrl]);

	return (
		<div className="flex flex-row justify-center w-full h-full">
			<ReactMediaRecorder
				audio
				render={({
					mediaBlobUrl,
					startRecording,
					status,
					stopRecording,
					clearBlobUrl,
					previewAudioStream,
				}) => {
					return (
						<div>
							{src ?? mediaBlobUrl ? (
								<div className="flex flex-col items-center">
									{!withoutDelete ? (
										<Button
											color="red"
											size={50}
											className="w-1/2 my-2"
											onClick={clearBlobUrl}
										>
											<MdDelete />
											Delete audio
										</Button>
									) : null}
									<audio
										src={src ?? mediaBlobUrl}
										controls
										onLoadedData={() => {
											setAudioUrl(mediaBlobUrl);
											setAudioStream(previewAudioStream);
										}}
									/>
								</div>
							) : status === "recording" ? (
								<Button color="transparent" onClick={stopRecording}>
									<FaRegStopCircle size={50} />
								</Button>
							) : (
								<Button color="transparent" onClick={startRecording}>
									<FaPlayCircle size={50} />
								</Button>
							)}
						</div>
					);
				}}
			/>
		</div>
	);
};

export default RecordView;
