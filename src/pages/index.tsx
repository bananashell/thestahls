import { Rsvp } from "components/rsvp";
import type { NextPage } from "next";

const Info: NextPage = () => {
	return (
		<section className="bg-white">
			<article>
				<Rsvp />
			</article>
		</section>
	);
};

export default Info;
