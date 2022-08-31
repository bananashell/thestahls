import { FunctionComponent, PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <section className="min-h-screen">
      <Header />
      <main className="p-4 mx-auto max-w-7xl ">{children}</main>
      <Footer />
    </section>
  );
};
