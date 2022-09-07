import * as trpc from "@trpc/server";
import { client } from "server/client";
import { z, TypeOf } from "zod";

type ModelBase = {
	id: number;
	created_at: string;
};

// enum MenuType {
// 	Meat = "MEAT",
// 	Vegetarian = "VEGETARIAN",
// 	Vegan = "VEGAN",
// }

const MenuType = ["MEAT", "VEGETARIAN", "VEGAN"] as const;

const guest = z.object({
	firstName: z.string(),
	lastName: z.string(),
	menuType: z.enum(MenuType),
	allergies: z.string(),
	alcoholFree: z.boolean(),
	rsvp: z.boolean(),
	fromHotel: z.boolean(),
	fromWedding: z.boolean(),
	fromDinner: z.boolean(),
	makesMeDance: z.string(),
});

type Guest = ModelBase & TypeOf<typeof guest>;

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
	.mutation("create", {
		input: guest,
		async resolve({ input }) {
			console.log("creating guest", input);
			const a = await client.from<Guest>("guests").insert(input);
			if (a.error || a.status < 200 || a.status >= 299) {
				throw a.error;
			}
			const id = a?.data?.at(0)?.id;
			console.log(`guest created id [${id}]`);
			return id;
		},
	});
