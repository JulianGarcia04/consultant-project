import admin from "firebase-admin";

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert("serviceAccountKey.json"),
		storageBucket: "monkeybook-d84c2.appspot.com",
	});
}

export const db = admin.firestore();

export const storage = admin.storage();
