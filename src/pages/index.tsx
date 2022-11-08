import { Rsvp } from "components/rsvp";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Info: NextPage = () => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
		return () => {};
	}, [setIsLoaded]);

	return (
		<section className="bg-white">
			<article>{isLoaded && <Rsvp />}</article>
		</section>
	);
};

export default Info;
