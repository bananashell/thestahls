import Logo from "@public/ea_logo.png";
import Image from "next/image";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center gap-8 py-8">
      <div className="relative aspect-square h-[250px]">
        <Image src={Logo} alt="logo" layout="responsive" />
      </div>
      <Navigation />
    </header>
  );
};
