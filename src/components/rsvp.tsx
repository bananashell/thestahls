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
import { nameOf } from "utils/nameOf";
import { trpc } from "utils/trpc";
import { TypeOf } from "zod";
import { CheckboxInput } from "./forms/CheckboxInput";
import { RadioGroupInput } from "./forms/RadioGroupInput";
import { TextInput } from "./forms/TextInput";

type FormValues = Partial<TypeOf<typeof AttendingGuest>> & Partial<TypeOf<typeof AbsenteeGuest>>;

export const Rsvp = () => {
	const { mutateAsync: createAbsenteeAsync } = trpc.useMutation(["guests.create.absentee"]);
	const { mutateAsync: createAttendeeAsync } = trpc.useMutation(["guests.create.attendee"]);

	const formContext = useForm<FormValues>({
		mode: "onChange",
	});

	const handleSubmit: SubmitHandler<FormValues> = async (values) => {
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

	const showMore = formContext.watch().rsvp === true;
	return (
		<FormContainer formContext={formContext} handleSubmit={handleSubmit}>
			<main>
				<TextInput
					label="Förnamn"
					name={nameOf<FormValues>("firstName")}
					register={formContext.register}
				/>
				<TextInput
					label="Efternamn"
					name={nameOf<FormValues>("lastName")}
					register={formContext.register}
				/>
				<RadioGroupInput
					name={nameOf<FormValues>("rsvp")}
					control={formContext.control}
					label="Kommer du?"
					values={[
						{ label: "Ja", value: true },
						{ label: "Nej", value: false },
					]}
				/>

				{showMore && (
					<section>
						<RadioGroupInput
							name={nameOf<FormValues>("menuType")}
							control={formContext.control}
							label="Föredragen meny"
							values={[
								{ label: "Kött", value: "MEAT" },
								{ label: "Vegetariskt", value: "VEGETARIAN" },
							]}
						/>
						<TextInput
							name={nameOf<FormValues>("allergies")}
							label={"Eventuella allergier"}
							register={formContext.register}
						/>
						<RadioGroupInput
							name={nameOf<FormValues>("alcoholFree")}
							control={formContext.control}
							label="Alkoholfritt till maten?"
							values={[
								{ label: "Ja", value: true },
								{ label: "Nej", value: false },
							]}
						/>
						<CheckboxInput
							name={nameOf<FormValues>("fromHotel")}
							label={"Från Steam Hotel till vigseln"}
							register={formContext.register}
						/>
						<CheckboxInput
							name={nameOf<FormValues>("fromWedding")}
							label={"Från Vigsel till Nybynäs Gård"}
							register={formContext.register}
						/>
						<CheckboxInput
							name={nameOf<FormValues>("fromDinner")}
							label={"Från Nybynäs Gård till Steam Hotel"}
							register={formContext.register}
						/>
						<TextInput
							name={nameOf<FormValues>("makesMeDance")}
							label="Den här får mig att dansa"
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
