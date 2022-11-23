import { TypeOf } from "zod";
import { AttendingGuest } from "./guest";

describe("Verify model validation", () => {
	describe("AttendingGuest", () => {
		it("no transportation", () => {
			let data: TypeOf<typeof AttendingGuest> = {
				alcoholFree: true,
				email: "asd@asd.se",
				firstName: "First name",
				lastName: "First name",
				fromDinner: false,
				fromHotel: false,
				fromWedding: false,
				noTransportNeeded: false,
				menuType: "MEAT",
				phone: "0711233",
				rsvp: true,
				hasAllergies: false,
				allergies: "",
				makesMeDance: "",
				message: "",
			};
			expect(() => AttendingGuest.parse(data)).toThrow();
		});

		it("all transportation", () => {
			let data: TypeOf<typeof AttendingGuest> = {
				alcoholFree: true,
				email: "asd@asd.se",
				firstName: "First name",
				lastName: "First name",
				fromDinner: true,
				fromHotel: true,
				fromWedding: true,
				noTransportNeeded: true,
				menuType: "MEAT",
				phone: "0711233",
				rsvp: true,
				hasAllergies: false,
				allergies: "",
				makesMeDance: "",
				message: "",
			};
			expect(() => AttendingGuest.parse(data)).toThrow();
		});

		it("valid transportation", () => {
			let data: TypeOf<typeof AttendingGuest> = {
				alcoholFree: true,
				email: "asd@asd.se",
				firstName: "First name",
				lastName: "First name",
				fromDinner: true,
				fromHotel: true,
				fromWedding: true,
				noTransportNeeded: false,
				menuType: "MEAT",
				phone: "0711233",
				rsvp: true,
				hasAllergies: false,
				allergies: "",
				makesMeDance: "",
				message: "",
			};

			expect(AttendingGuest.parse(data)).toBeDefined();
		});

		it("Missing name", () => {
			let data: TypeOf<typeof AttendingGuest> = {
				alcoholFree: true,
				email: "asd@asd.se",
				firstName: "",
				lastName: "First name",
				fromDinner: true,
				fromHotel: true,
				fromWedding: true,
				noTransportNeeded: false,
				menuType: "MEAT",
				phone: "0711233",
				rsvp: true,
				hasAllergies: false,
				allergies: "",
				makesMeDance: "",
				message: "",
			};

			let output = AttendingGuest.safeParse(data);
			expect(output.success).toBeFalsy();
			expect(output.success == false && output.error.errors.length).toBe(1);
			expect(
				output.success == false && output.error.formErrors.fieldErrors.firstName,
			).toContain("Obligatorisk");
		});

		it("Missing lastname", () => {
			let data: TypeOf<typeof AttendingGuest> = {
				alcoholFree: true,
				email: "asd@asd.se",
				firstName: "First name",
				lastName: "",
				fromDinner: true,
				fromHotel: true,
				fromWedding: true,
				noTransportNeeded: false,
				menuType: "MEAT",
				phone: "0711233",
				rsvp: true,
				hasAllergies: false,
				allergies: "",
				makesMeDance: "",
				message: "",
			};

			let output = AttendingGuest.safeParse(data);
			expect(output.success).toBeFalsy();
			expect(output.success == false && output.error.errors.length).toBe(1);
			expect(
				output.success == false && output.error.formErrors.fieldErrors.lastName,
			).toContain("Obligatorisk");
		});

		it("Fails when has allergies but no allergy info", () => {
			let data: TypeOf<typeof AttendingGuest> = {
				alcoholFree: true,
				email: "asd@asd.se",
				firstName: "First name",
				lastName: "Last name",
				fromDinner: true,
				fromHotel: true,
				fromWedding: true,
				noTransportNeeded: false,
				menuType: "MEAT",
				phone: "0711233",
				rsvp: true,
				hasAllergies: true,
				allergies: "",
				makesMeDance: "",
				message: "",
			};

			let output = AttendingGuest.safeParse(data);
			expect(output.success).toBeFalsy();
			expect(output.success == false && output.error.errors.length).toBe(1);
			expect(
				output.success == false && output.error.formErrors.fieldErrors.allergies,
			).toContain("Du måste fylla i vilka allergier du har");
		});

		it("Succeeds when has allergies and has allergy info", () => {
			let data: TypeOf<typeof AttendingGuest> = {
				alcoholFree: true,
				email: "asd@asd.se",
				firstName: "First name",
				lastName: "Last name",
				fromDinner: true,
				fromHotel: true,
				fromWedding: true,
				noTransportNeeded: false,
				menuType: "MEAT",
				phone: "0711233",
				rsvp: true,
				hasAllergies: true,
				allergies: "Skaldjur",
				makesMeDance: "",
				message: "",
			};

			let output = AttendingGuest.safeParse(data);
			expect(output.success).toBeTruthy();
		});

		it("Succeeds when doesnt have allergies", () => {
			let data: TypeOf<typeof AttendingGuest> = {
				alcoholFree: true,
				email: "asd@asd.se",
				firstName: "First name",
				lastName: "Last name",
				fromDinner: true,
				fromHotel: true,
				fromWedding: true,
				noTransportNeeded: false,
				menuType: "MEAT",
				phone: "0711233",
				rsvp: true,
				hasAllergies: false,
				allergies: "",
				makesMeDance: "",
				message: "",
			};

			let output = AttendingGuest.safeParse(data);
			expect(output.success).toBeTruthy();
		});
	});
});
