import { isObject, isArray, isUndefined, isNull, isNaN } from "lodash";

const isDefined = <T>(entity: T) => {
	return !isUndefined(entity) && !isNull(entity) && !isNaN(entity);
};

const cleanObject = <T>(entity: T) => {
	if (!isObject(entity)) {
		return entity;
	}

	const entriesEntity = Object.entries(entity);

	const newObj = entriesEntity.reduce((acc, [key, value]) => {
		if (isArray(value)) {
			return { ...acc, [key]: cleanArray(value) };
		}

		if (isDefined(value)) {
			return { ...acc, [key]: value };
		}
		return { ...acc };
	}, {} as Partial<T>);

	return newObj;
};

const cleanArray = <T>(entityArr: T[]) => {
	const res: Partial<T>[] = [];

	entityArr.forEach((val) => {
		if (isObject(val)) {
			const newObj = cleanObject(val);

			res.push(newObj);

			return;
		}

		if (isDefined(val)) {
			res.push(val);
			return;
		}
	});

	return res;
};

export const cleanData = <T>(entity: T | T[]): Partial<T> | Partial<T>[] => {
	if (isArray(entity)) {
		return cleanArray(entity);
	}

	if (isObject(entity)) {
		const newObj = cleanObject(entity);

		return newObj;
	}

	if (isDefined(entity)) {
		return entity;
	}

	throw new TypeError("The value is undefined");
};
