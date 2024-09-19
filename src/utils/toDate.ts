import { format } from "@formkit/tempo";
import { Timestamp } from "firebase-admin/firestore";

export const toDate = (val?: unknown) => {
	if (val instanceof Timestamp) {
		return format(val.toDate(), {
			date: "full",
			time: "short",
		});
	}

	if (val instanceof Date) {
		return format(val, {
			date: "full",
			time: "short",
		});
	}

	if (typeof val !== "string") {
		return;
	}

	return format(new Date(val), {
		date: "full",
		time: "short",
	});
};
