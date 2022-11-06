import type { NextPage } from "next";
import { trpc } from "utils/trpc";

const Gaster: NextPage = () => {
	const { data } = trpc.useQuery(["guests.list"]);

	return (
		<section className="bg-white">
			<h1>Gäster</h1>
			<article>
				{data?.map((g, i) => (
					<div key={i}>
						<span>
							{g.firstName} {g.lastName} {g.rsvp ? "kommer" : "kommer inte"}
						</span>
					</div>
				))}
			</article>
		</section>
	);
};

export default Gaster;
