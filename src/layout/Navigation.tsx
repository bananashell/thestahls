import Link from "next/link";
import * as Routes from "routes";

type Route = { label: string; href: string };
const routes: Route[] = [
  { label: "Hem", href: Routes.home },
  { label: "Info", href: Routes.info },
];

export const Navigation = () => {
  return (
    <>
      <ul className="flex gap-4 text-white uppercase">
        {routes.map(({ label, href }, i) => (
          <>
            <li key={href} className="">
              <Link href={href}>
                <a>{label}</a>
              </Link>
            </li>
            {i < routes.length - 1 && <span>/</span>}
          </>
        ))}
      </ul>
    </>
  );
};
