import { z } from "zod";

const MenuType = ["MEAT", "VEGETARIAN", "VEGAN"] as const;

export const AbsenteeGuest = z.object({
	firstName: z.string({ required_error: "Obligatorisk" }).trim().min(1, "Obligatorisk"),
	lastName: z.string({ required_error: "Obligatorisk" }).trim().min(1, "Obligatorisk"),
	rsvp: z.literal(false),
	message: z.string().optional(),
});

export const AttendingGuest = AbsenteeGuest.merge(
	z.object({
		phone: z.string({ required_error: "Obligatorisk" }).trim().min(1, "Obligatorisk"),
		email: z.string({ required_error: "Obligatorisk" }).trim().min(1, "Obligatorisk"),
		menuType: z.enum(MenuType),
		allergies: z.string().optional(),
		alcoholFree: z.boolean(),
		fromHotel: z.boolean(),
		fromWedding: z.boolean(),
		fromDinner: z.boolean(),
		noTransportNeeded: z.boolean(),
		makesMeDance: z.string().optional(),
		rsvp: z.literal(true),
	}),
)
	.refine(
		(data) =>
			data.noTransportNeeded && !(data.fromDinner || data.fromHotel || data.fromWedding),
		{
			message:
				"Du måste välja 'Behöver ingen transport' eller transport från någon av händelserna",
			path: ["noTransportNeeded"],
		},
	)
	.refine(
		(data) => data.noTransportNeeded || data.fromDinner || data.fromHotel || data.fromWedding,
		{
			message: "Du måste välja om du behöver transport eller ej",
			path: ["noTransportNeeded"],
		},
	);
