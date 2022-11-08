import { FormContainer } from "components/forms/FormContainer";
import { AbsenteeGuest, AttendingGuest } from "models/guest";
import { SubmitHandler, useForm } from "react-hook-form";
import { nameOf } from "utils/nameOf";
import { trpc } from "utils/trpc";
import { TypeOf } from "zod";
import { AttendanceInput } from "./forms/AttendanceInput";
import { CheckboxInput } from "./forms/CheckboxInput";
import { RadioGroupInput } from "./forms/RadioGroupInput";
import { TextInput } from "./forms/TextInput";
import { ThanksForResponse } from "./ThanksForResponse";

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

	const willCome = formContext.watch().rsvp === true;
	const hasSetRsvp = typeof formContext.watch().rsvp === "boolean";

	if (formContext.formState.isSubmitted) {
		return <ThanksForResponse rsvp={willCome} reset={() => formContext.reset()} />;
	}

	return (
		<>
			<h1 className="mb-8 text-lg text-center">
				Osa gärna så snart som möjligt, men senast <strong>30:e April</strong>
			</h1>
			<FormContainer formContext={formContext} handleSubmit={handleSubmit}>
				<main className="container flex flex-col items-center gap-4 px-8 mx-auto">
					<AttendanceInput
						name={nameOf<FormValues>("rsvp")}
						control={formContext.control}
						label="Kommer du?"
					/>

					<article
						className={`mt-4 w-full opacity-0 flex flex-col gap-y-8 transition-all duration-500 ${
							hasSetRsvp ? "opacity-100" : ""
						}`}
					>
						{formContext.watch().rsvp === true && (
							<h1 className="text-2xl text-center">Va roligt att du kommer!</h1>
						)}
						{formContext.watch().rsvp === false && (
							<h1 className="text-2xl text-center">
								Va tråkigt att du inte kan komma!
							</h1>
						)}

						<section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
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
						</section>

						{willCome && (
							<>
								<section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
									<TextInput
										label="Telefonnummer"
										name={nameOf<FormValues>("phone")}
										register={formContext.register}
									/>
									<TextInput
										label="Email"
										type="email"
										name={nameOf<FormValues>("email")}
										register={formContext.register}
									/>
								</section>
								<RadioGroupInput
									name={nameOf<FormValues>("menuType")}
									control={formContext.control}
									label="Föredragen meny"
									values={[
										{ label: "Kött, tack", value: "MEAT" },
										{ label: "Vegetariskt, gärna", value: "VEGETARIAN" },
									]}
								/>
								<TextInput
									name={nameOf<FormValues>("allergies")}
									label={"Har du några allergier?"}
									register={formContext.register}
									options={{ required: false }}
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
								<section className="flex flex-col gap-2">
									<span>Behöver du transport under dagen?</span>
									<CheckboxInput
										name={nameOf<FormValues>("fromHotel")}
										label={"Från Steam Hotel till vigseln"}
										register={formContext.register}
									/>
									<CheckboxInput
										name={nameOf<FormValues>("fromWedding")}
										label={"Från vigseln till Nybynäs Gård"}
										register={formContext.register}
									/>
									<CheckboxInput
										name={nameOf<FormValues>("fromDinner")}
										label={"Från Nybynäs Gård till Steam Hotel"}
										register={formContext.register}
									/>
								</section>
								<TextInput
									name={nameOf<FormValues>("makesMeDance")}
									label="Den här låten får mig att dansa"
									register={formContext.register}
									options={{ required: false }}
									placeholder=""
								/>
							</>
						)}
						<TextInput
							name={nameOf<FormValues>("message")}
							label="Vill du lämna ett meddelande eller kommentar till bröllopsparet?"
							register={formContext.register}
							options={{ required: false }}
							placeholder=""
						/>
						<footer className="flex justify-center py-4">
							<button
								type="submit"
								disabled={
									!formContext.formState.isDirty ||
									formContext.formState.isSubmitting
								}
								className="px-16 py-3 text-white uppercase bg-gray-800 rounded disabled:bg-gray-200"
							>
								Skicka
							</button>
						</footer>
					</article>
				</main>
			</FormContainer>
		</>
	);
};
