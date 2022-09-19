import * as trpc from "@trpc/server";
import { AbsenteeGuest, AttendingGuest } from "models/guest";
import { client } from "server/client";
import { z, TypeOf } from "zod";

type GuestBase = {
	id: number;
	created_at: string;
};
type Guest = GuestBase & (TypeOf<typeof AbsenteeGuest> | TypeOf<typeof AttendingGuest>);

export const guests = trpc
	.router()
	.query("single", {
		resolve() {
			console.log("Ping");
			return "hello";
		},
	})
	.query("list", {
		async resolve() {
			const guests = await client.from<Guest>("guests").select("*");

			return guests.data;
		},
	})
	.mutation("create.absentee", {
		input: AbsenteeGuest,
		async resolve({ input }) {
			console.log("creating absentee", input);
			const a = await client.from<Guest>("guests").insert(input);
			if (a.error || a.status < 200 || a.status >= 299) {
				throw a.error;
			}
			const id = a?.data?.at(0)?.id;
			console.log(`guest created id [${id}]`);
			return id;
		},
	})
	.mutation("create.attendee", {
		input: AttendingGuest,
		async resolve({ input }) {
			console.log("creating attendee", input);
			const a = await client.from<Guest>("guests").insert(input);
			if (a.error || a.status < 200 || a.status >= 299) {
				throw a.error;
			}
			const id = a?.data?.at(0)?.id;
			console.log(`guest created id [${id}]`);
			return id;
		},
	});
