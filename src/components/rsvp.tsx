import { trpc } from "utils/trpc";

export const Rsvp = () => {
	const { mutateAsync } = trpc.useMutation("guests.create");

	const handleClick = () => {
		mutateAsync({
			firstName: "Test",
			lastName: "Testsson",
			alcoholFree: false,
			allergies: "",
			fromDinner: true,
			fromHotel: true,
			fromWedding: true,
			makesMeDance: "",
			rsvp: false,
			menuType: "MEAT",
		});
	};

	return <button onClick={handleClick}>Create</button>;
};
