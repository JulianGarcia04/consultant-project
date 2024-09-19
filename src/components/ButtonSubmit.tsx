"use client";
import { MouseEventHandler, useEffect, useRef } from "react";
import { Button } from "flowbite-react";

import { useFormStatus } from "react-dom";

interface PropsComponent {
	color?:
		| "danger"
		| "default"
		| "primary"
		| "secondary"
		| "success"
		| "warning";
	isLoading?: boolean;
	isDisabled?: boolean;
	fullWidth?: boolean;
	label?: string;
	icon?: React.ReactNode;
	className?: string;
	onChangeLoading?: () => void;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

function SubmitButton({
	color,
	isDisabled,
	label,
	onChangeLoading,
	icon,
	className,
	onClick,
}: PropsComponent) {
	const { pending, method } = useFormStatus();

	// this is when the finish of do the data fetching

	// (detect finishing of the data fetching or server action)

	const methodRef = useRef(method);

	useEffect(() => {
		// this is avoid the execute the onChangeLoading in the first render
		if (!onChangeLoading) {
			return;
		}

		if (pending) {
			methodRef.current = method;
			return;
		}

		if (!pending && methodRef.current != null) {
			onChangeLoading();
		}
	}, [onChangeLoading, pending, methodRef, method]);

	return (
		<Button
			type="submit"
			className={`bg-${color} ${className ?? ""}`}
			isProcessing={pending}
			disabled={isDisabled}
			onClick={onClick}
		>
			{icon}
			{label}
		</Button>
	);
}

export default SubmitButton;
