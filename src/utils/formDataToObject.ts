export function formDataToObject(formData: FormData): Record<string, unknown> {
	const obj: Record<string, unknown> = {};

	formData.forEach((value, key) => {
		if (obj[key]) {
			if (Array.isArray(obj[key])) {
				obj[key].push(value); // Add to the existing array
			} else {
				obj[key] = [obj[key], value]; // Convert to an array
			}
		} else {
			obj[key] = value; // Set the key-value pair
		}
	});

	return obj;
}
