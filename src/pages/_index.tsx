import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <section className="px-4 py-8 text-center bg-white">
      <article className="flex flex-col items-center justify-center max-w-4xl mx-auto prose lg:prose-lg prose-headings:font-normal">
        <section className="py-8">
          <h1>VI SKA GIFTA OSS!</h1>
          <p>
            Vad roligt att ni hittat hit! Då utgår vi ifrån att våra
            inbjudningar har kommit fram!
          </p>
          <p>
            Den 29 Juli 2023 är det äntligen dags för oss att få säga ja till
            varandra och kärleken! Detta är något vi ser otroligt mycket fram
            emot och vi hoppas verkligen att ni ska vilja komma och fira den
            stora dagen med oss! Högst upp på sidan i de olika kategorierna kan
            ni läsa mer om hur vi har planerat och tänkt kring dagen. Där kan ni
            också OSA, boka övernattning m,m. Varmt välkomna!
          </p>
          <p>/Emil & Amanda</p>
        </section>
        <div className="w-full not-prose">
          <hr className="w-full border-t border-gray-50" />
        </div>
        <section className="py-8">
          <h3>Visst måste man väl ändå tro på ödet?</h3>
          När våra vägar korsades en regnig kväll i London, två dagar innan
          nyårsafton 2012.
        </section>
      </article>
    </section>
  );
};

export default Home;
