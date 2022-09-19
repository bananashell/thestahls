import { z } from "zod";

const MenuType = ["MEAT", "VEGETARIAN", "VEGAN"] as const;

export const AbsenteeGuest = z.object({
	firstName: z.string(),
	lastName: z.string(),
	rsvp: z.literal(false),
});

export const AttendingGuest = AbsenteeGuest.merge(
	z.object({
		menuType: z.enum(MenuType),
		allergies: z.string(),
		alcoholFree: z.boolean(),
		fromHotel: z.boolean(),
		fromWedding: z.boolean(),
		fromDinner: z.boolean(),
		makesMeDance: z.string(),
		rsvp: z.literal(true),
	}),
);
