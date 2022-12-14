import * as trpc from "@trpc/server";
import { getDocs, addDoc, Timestamp } from "firebase/firestore/lite";
import { AbsenteeGuest, AttendingGuest } from "models/guest";
import { db, guestCollection, listGuests } from "server/fireClient";
import { z, TypeOf } from "zod";
import { compareDesc, parseJSON } from "date-fns";

type GuestBase = {
	id: number;
};
export type Guest = GuestBase & (TypeOf<typeof AbsenteeGuest> | TypeOf<typeof AttendingGuest>);
const EPOCH_DATE = new Date(0);
export const guests = trpc
	.router()
	.query("list", {
		async resolve() {
			const snapshot = await getDocs(guestCollection);
			let guests = snapshot.docs.map((doc) => {
				let guest = doc.data() as Guest;
				if (guest.created_at instanceof Timestamp) {
					guest.created_at = (guest.created_at as Timestamp).toDate();
				}

				return guest;
			});

			let sortedGuests = guests.sort((a, b) => {
				let aDate =
					typeof a.created_at === "string"
						? parseJSON(a.created_at)
						: a.created_at ?? EPOCH_DATE;
				let bDate =
					typeof b.created_at === "string"
						? parseJSON(b.created_at)
						: b.created_at ?? EPOCH_DATE;

				return compareDesc(aDate, bDate);
			});

			return sortedGuests;
		},
	})
	.mutation("create.absentee", {
		input: AbsenteeGuest,
		async resolve({ input }) {
			input.created_at ??= new Date();
			console.log("creating absentee", input);
			const result = await addDoc(guestCollection, input);
			console.log(`guest created id [${result.id}]`);

			return result.id;
		},
	})
	.mutation("create.attendee", {
		input: AttendingGuest,
		async resolve({ input }) {
			input.created_at ??= new Date();
			console.log("creating absentee", input);
			const result = await addDoc(guestCollection, input);
			console.log(`guest created id [${result.id}]`);

			return result.id;
		},
	});
