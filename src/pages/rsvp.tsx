import { Rsvp } from "components/rsvp";
import type { NextPage } from "next";
import { trpc } from "utils/trpc";

const Info: NextPage = () => {
	return (
		<section className="bg-white">
			<h1>RSVP</h1>
			<article>
				<Rsvp />
			</article>
		</section>
	);
};

export default Info;
