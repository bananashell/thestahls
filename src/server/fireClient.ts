import { initializeApp, FirebaseOptions } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore/lite";
import { AbsenteeGuest, AttendingGuest } from "models/guest";

const firebaseConfig: FirebaseOptions = {
	apiKey: process.env.FIREBASE_APIKEY,
	authDomain: process.env.FIREBASE_AUTHDOMAIN,
	projectId: process.env.FIREBASE_PROJECTID,
	storageBucket: process.env.FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
	appId: process.env.FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const guestCollection = collection(db, "guests");

export async function listGuests() {
	const col = collection(db, "guests");
	const snapshot = await getDocs(col);
	const guestList = snapshot.docs.map((doc) => doc.data());

	return guestList;
}
