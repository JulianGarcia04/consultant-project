import admin from "firebase-admin";

import "../envConfig";

if (!admin.apps.length) {
	try {
		admin.initializeApp({
			credential: admin.credential.cert("serviceAccountKey.json"),
			storageBucket: process.env.STORAGE_BUCKET,
		});
	} catch (error) {
		admin.initializeApp({
			credential: admin.credential.cert({
				clientEmail: process.env.CLIENT_EMAIL,
				privateKey: process.env.PRIVATE_KEY,
				projectId: process.env.PROJECT_ID,
			}),
			storageBucket: process.env.STORAGE_BUCKET,
		});
	}
}

export const db = admin.firestore();

export const storage = admin.storage();
