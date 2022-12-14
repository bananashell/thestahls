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
	const {
		mutateAsync: createAbsenteeAsync,
		isSuccess: isSuccessAbsentee,
		isError: isErrorAbsentee,
		reset: resetAbsentee,
	} = trpc.useMutation(["guests.create.absentee"]);
	const {
		mutateAsync: createAttendeeAsync,
		isSuccess: isSuccessAttendee,
		isError: isErrorAttendee,
		reset: resetAttendee,
	} = trpc.useMutation(["guests.create.attendee"]);

	const formContext = useForm<FormValues>({
		mode: "onChange",
	});

	const handleSubmit: SubmitHandler<FormValues> = async (values) => {
		try {
			values.rsvp ? await handleCreateAttendee(values) : await handleCreateAbsentee(values);
		} catch (e) {
			console.error(e);
			return false;
		}
	};

	const handleCreateAbsentee = async (values: FormValues) => {
		const data = AbsenteeGuest.safeParse(values);
		if (!data.success) {
			console.table(data.error);
			Object.entries(data.error.formErrors.fieldErrors).forEach(([name, message]) => {
				formContext.setError(name as keyof TypeOf<typeof AbsenteeGuest>, {
					message: Array.isArray(message) ? message[0] : message,
				});
			});

			return;
		}

		await createAbsenteeAsync(data.data);
	};

	const handleCreateAttendee = async (values: FormValues) => {
		const data = AttendingGuest.safeParse(values);
		if (!data.success) {
			Object.entries(data.error.formErrors.fieldErrors).forEach(([name, message]) => {
				formContext.setError(name as keyof TypeOf<typeof AttendingGuest>, {
					message: Array.isArray(message) ? message[0] : message,
				});
			});

			return;
		}

		await createAttendeeAsync(data.data);
	};

	const willCome = formContext.watch().rsvp === true;
	const hasSetRsvp = typeof formContext.watch().rsvp === "boolean";

	if (isSuccessAbsentee || isSuccessAttendee) {
		return (
			<ThanksForResponse
				rsvp={willCome}
				reset={() => {
					formContext.reset();
					resetAbsentee();
					resetAttendee();
				}}
			/>
		);
	}

	return (
		<>
			<h1 className="mb-8 text-lg text-center">
				Osa g??rna s?? snart som m??jligt, men senast <strong>30:e April</strong>
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
								Va tr??kigt att du inte kan komma!
							</h1>
						)}

						<section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
							<TextInput
								label="F??rnamn"
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
									label="F??redragen meny"
									values={[
										{ label: "K??tt, tack", value: "MEAT" },
										{ label: "Vegetariskt, g??rna", value: "VEGETARIAN" },
										{ label: "Veganskt, gladeligen", value: "VEGAN" },
									]}
								/>
								<RadioGroupInput
									name={nameOf<FormValues>("hasAllergies")}
									control={formContext.control}
									label="Har du n??gra allergier?"
									values={[
										{ label: "Ja", value: true },
										{ label: "Nej", value: false },
									]}
								/>
								{formContext.watch().hasAllergies && (
									<div className="-mt-8">
										<TextInput
											name={nameOf<FormValues>("allergies")}
											label={"Vad ??r du allergisk mot?"}
											register={formContext.register}
										/>
									</div>
								)}
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
									<span>Beh??ver du transport under dagen?</span>
									<CheckboxInput
										name={nameOf<FormValues>("fromHotel")}
										label={"Fr??n Steam Hotel till vigseln"}
										register={formContext.register}
										options={{
											deps: [
												"fromHotel",
												"fromWedding",
												"fromDinner",
												"noTransportNeeded",
											],
										}}
									/>
									<CheckboxInput
										name={nameOf<FormValues>("fromWedding")}
										label={"Fr??n vigseln till Nybyn??s G??rd"}
										register={formContext.register}
										options={{
											deps: [
												"fromHotel",
												"fromWedding",
												"fromDinner",
												"noTransportNeeded",
											],
										}}
									/>
									<CheckboxInput
										name={nameOf<FormValues>("fromDinner")}
										label={"Fr??n Nybyn??s G??rd till Steam Hotel"}
										register={formContext.register}
										options={{
											deps: [
												"fromHotel",
												"fromWedding",
												"fromDinner",
												"noTransportNeeded",
											],
										}}
									/>
									<CheckboxInput
										name={nameOf<FormValues>("noTransportNeeded")}
										label={"Beh??ver ingen transport"}
										register={formContext.register}
										options={{
											deps: [
												"fromHotel",
												"fromWedding",
												"fromDinner",
												"noTransportNeeded",
											],
										}}
									/>
									<span className="text-sm text-red-500">
										{formContext.formState.errors.fromHotel?.message ||
											formContext.formState.errors.fromWedding?.message ||
											formContext.formState.errors.fromDinner?.message ||
											formContext.formState.errors.noTransportNeeded?.message}
									</span>
								</section>
								<TextInput
									name={nameOf<FormValues>("makesMeDance")}
									label="Den h??r l??ten f??r mig att dansa"
									register={formContext.register}
									options={{ required: false }}
									placeholder=""
								/>
							</>
						)}
						<TextInput
							name={nameOf<FormValues>("message")}
							label="Vill du l??mna ett meddelande eller kommentar till br??llopsparet?"
							subLabel={
								formContext.watch().rsvp
									? "Exempelvis om du kommer amma under middagen"
									: undefined
							}
							register={formContext.register}
							options={{ required: false }}
							placeholder=""
						/>
						<footer className="flex justify-center py-4">
							{(isErrorAbsentee || isErrorAbsentee) && <>Error</>}
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
