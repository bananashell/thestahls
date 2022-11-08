import { z } from "zod";

const MenuType = ["MEAT", "VEGETARIAN", "VEGAN"] as const;

export const AbsenteeGuest = z.object({
	firstName: z.string(),
	lastName: z.string(),
	rsvp: z.literal(false),
	message: z.string().optional(),
});

export const AttendingGuest = AbsenteeGuest.merge(
	z.object({
		phone: z.string(),
		email: z.string(),
		menuType: z.enum(MenuType),
		allergies: z.string().optional(),
		alcoholFree: z.boolean(),
		fromHotel: z.boolean(),
		fromWedding: z.boolean(),
		fromDinner: z.boolean(),
		makesMeDance: z.string().optional(),
		rsvp: z.literal(true),
	}),
);
