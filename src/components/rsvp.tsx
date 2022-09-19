import { FormContainer } from "components/forms/FormContainer";
import { AbsenteeGuest, AttendingGuest } from "models/guest";
import {
	FieldValues,
	SubmitHandler,
	useForm,
	UseFormRegisterReturn,
	Validate,
	ValidationRule,
} from "react-hook-form";
import { trpc } from "utils/trpc";
import { CheckboxInput } from "./forms/CheckboxInput";
import { RadioGroupInput } from "./forms/RadioGroupInput";
import { TextInput } from "./forms/TextInput";

type FormValues = Partial<{
	firstName: string;
	lastName: string;
	rsvp: "YES" | "NO";
	menuType: "MEAT" | "VEGETARIAN";
	allergies: string;
	alchoholFree: "YES" | "NO";
	trip_toWedding: "YES" | "NO";
	trip_toDinner: "YES" | "NO";
	trip_toHotel: "YES" | "NO";
}>;

export const Rsvp = () => {
	const { mutateAsync: createAbsenteeAsync } = trpc.useMutation(["guests.create.absentee"]);
	const { mutateAsync: createAttendeeAsync } = trpc.useMutation(["guests.create.attendee"]);

	const formContext = useForm<FormValues>({
		mode: "onChange",
	});

	const handleSubmit: SubmitHandler<FormValues> = async (values) => {
		if (typeof values.rsvp !== "boolean") {
			throw new Error("rsvp must be set");
		}

		values.rsvp ? await handleCreateAttendee(values) : await handleCreateAbsentee(values);
	};

	const handleCreateAbsentee = async (values: FormValues) => {
		const data = AbsenteeGuest.parse(values);
		await createAbsenteeAsync(data);
	};

	const handleCreateAttendee = async (values: FormValues) => {
		const data = AttendingGuest.parse(values);
		await createAttendeeAsync(data);
	};

	const showMore = formContext.watch().rsvp === "YES";
	return (
		<FormContainer formContext={formContext} handleSubmit={handleSubmit}>
			<main>
				<TextInput label="Förnamn" name={"firstName"} register={formContext.register} />
				<TextInput label="Efternamn" name={"lastName"} register={formContext.register} />
				<RadioGroupInput
					name="rsvp"
					register={formContext.register}
					label="Kommer du?"
					values={[
						{ label: "Ja", value: "YES" },
						{ label: "Nej", value: "NO" },
					]}
				/>

				{showMore && (
					<section>
						<RadioGroupInput
							name="menuType"
							register={formContext.register}
							label="Föredragen meny"
							values={[
								{ label: "Kött", value: "MEAT" },
								{ label: "Vegetariskt", value: "VEGETARIAN" },
							]}
						/>
						<TextInput
							name={"allergies"}
							label={"Eventuella allergier"}
							register={formContext.register}
						/>
						<RadioGroupInput
							name="alcoholFree"
							register={formContext.register}
							label="Alkoholfritt till maten?"
							values={[
								{ label: "Ja", value: "YES" },
								{ label: "Nej", value: "NO" },
							]}
						/>
						<CheckboxInput
							name={"trip_toWedding"}
							label={"Från Steam Hotel till vigseln"}
							register={formContext.register}
						/>
						<CheckboxInput
							name={"trip_toDinner"}
							label={"Från Vigsel till Nybynäs Gård"}
							register={formContext.register}
						/>
						<CheckboxInput
							name={"trip_toHotel"}
							label={"Från Nybynär Gård till Steam Hotel"}
							register={formContext.register}
						/>
					</section>
				)}
			</main>
			<footer className="flex justify-center py-4">
				<button
					type="submit"
					disabled={!formContext.formState.isDirty || formContext.formState.isSubmitting}
					className="px-16 py-3 text-white uppercase bg-gray-800 rounded disabled:bg-gray-200"
				>
					Skicka
				</button>
			</footer>
		</FormContainer>
	);
};
