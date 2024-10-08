"use client";
import { StaticImageData } from "next/image";
import Image from "next/image";
import React, {
	useRef,
	useState,
	useReducer,
	// FormEventHandler,
	MouseEventHandler,
} from "react";

interface Props {
	imageSrc: string | StaticImageData;
	children?: React.ReactNode;
	pointerComponent: (
		hide: boolean,
		setHide: (val: boolean) => void,
		positionX: number,
		positionY: number
	) => React.ReactNode;
	className?: string;
	disablePicker?: boolean;
}

interface Selection_State_Reducer {
	x: number;
	y: number;
	width: number;
	height: number;
}

interface Action_Reducer {
	type: "mouse_down" | "mouse_move";
	new_x: number;
	new_y: number;
}

const reducer = (
	state: Selection_State_Reducer,
	action: Action_Reducer
): Selection_State_Reducer => {
	if (action.type === "mouse_down") {
		return {
			...state,
			x: action.new_x,
			y: action.new_y,
		};
	}

	if (action.type === "mouse_move") {
		return {
			...state,
			width: action.new_x - state.x,
			height: action.new_y - state.y,
		};
	}

	throw new Error("Give me a reducer type");
};

const ImagePicker = ({
	imageSrc,
	children,
	className,
	pointerComponent,
	disablePicker,
}: Props) => {
	const ImageRef = useRef<HTMLImageElement>(null);
	const [isSelecting, setIsSelecting] = useState(false);

	const [selection, dispatch] = useReducer(reducer, {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});

	const handleMouseClick: MouseEventHandler<HTMLImageElement> = (e) => {
		if (disablePicker) {
			return;
		}

		if (isSelecting) {
			setIsSelecting(false);
			return;
		}

		setIsSelecting(true);
		dispatch({
			type: "mouse_down",
			new_x: e.nativeEvent.offsetX,
			new_y: e.nativeEvent.offsetY,
		});
	};

	return (
		<div className={`relative h-full w-full ${className}`}>
			<Image
				ref={ImageRef}
				src={imageSrc}
				priority={true}
				alt="Image to comment on"
				onClick={handleMouseClick}
				fill
			/>
			{children}
			{isSelecting ? (
				<div
					style={{
						position: "absolute",
						top: selection.y,
						left: selection.x,
					}}
				>
					{pointerComponent(
						isSelecting,
						setIsSelecting,
						selection.x,
						selection.y
					)}
				</div>
			) : null}
		</div>
	);
};

export default ImagePicker;
