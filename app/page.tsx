import Header from "@/components/header/Header";
import { HeroCarousal } from "@/components/siteComponents/HeroCarousal";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Header />
      <HeroCarousal />
    </main>
  );
}
