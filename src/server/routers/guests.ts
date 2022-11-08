import * as trpc from "@trpc/server";
import { getDocs, addDoc } from "firebase/firestore/lite";
import { AbsenteeGuest, AttendingGuest } from "models/guest";
import { client } from "server/client";
import { db, guestCollection, listGuests } from "server/fireClient";
import { z, TypeOf } from "zod";

type GuestBase = {
	id: number;
	created_at: string;
};
export type Guest = GuestBase & (TypeOf<typeof AbsenteeGuest> | TypeOf<typeof AttendingGuest>);

export const guests = trpc
	.router()
	.query("list", {
		async resolve() {
			const snapshot = await getDocs(guestCollection);
			return snapshot.docs.map((doc) => doc.data() as Guest);
		},
	})
	.mutation("create.absentee", {
		input: AbsenteeGuest,
		async resolve({ input }) {
			console.log("creating absentee", input);
			const result = await addDoc(guestCollection, input);
			console.log(`guest created id [${result.id}]`);

			return result.id;
		},
	})
	.mutation("create.attendee", {
		input: AttendingGuest,
		async resolve({ input }) {
			console.log("creating absentee", input);
			const result = await addDoc(guestCollection, input);
			console.log(`guest created id [${result.id}]`);

			return result.id;
		},
	});
