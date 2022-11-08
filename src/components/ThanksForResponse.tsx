import Image from "next/image";
import JA from "@public/ja.png";
import NEJ from "@public/nej.png";

export const ThanksForResponse = ({ rsvp, reset }: { rsvp: boolean; reset: () => void }) => {
	return (
		<section className="flex flex-col items-center justify-center min-h-screen text-center">
			<h1 className="mb-12 text-2xl text-center">
				Tack för ditt svar, {rsvp ? "vi ses i sommar!" : "tråkigt att du inte kan komma"}
			</h1>
			<article className="flex flex-col gap-2">
				<p>Vill du skicka in svar för en person till?</p>
				<section className="grid grid-cols-2 gap-4">
					<button
						onClick={() => reset()}
						className="transition-opacity opacity-40 w-44 hover:opacity-100"
					>
						<Image src={JA} alt="Ja" />
					</button>
					<a
						href="https://thestahls.se"
						className="transition-opacity opacity-40 w-44 hover:opacity-100"
					>
						<Image src={NEJ} alt="Nej" />
					</a>
				</section>
			</article>
		</section>
	);
};
