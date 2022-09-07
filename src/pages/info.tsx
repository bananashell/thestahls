import type { NextPage } from "next";
import { trpc } from "utils/trpc";

const Info: NextPage = () => {
  const { data } = trpc.useQuery(["guests.list"]);

  return (
    <section className="bg-white">
      <h1>När och var?</h1>
      <article>
        <h1>{JSON.stringify(data)}</h1>
      </article>
    </section>
  );
};

export default Info;
