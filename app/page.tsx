import Header from "@/components/header/Header";
import { CategoriesSlider } from "@/components/siteComponents/CategoriesSlider";
import { HeroCarousal } from "@/components/siteComponents/HeroCarousal";
import { ImageCarousal } from "@/components/siteComponents/ImageCarousal";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">

      <Header />

      <HeroCarousal />

      <img
      src='https://www.balwaan.com/assets/desktop/images/banner-new3.svg' 
      width={1082}
      alt="banner"
      className="rounded-xl p-3 pl-0 overflow-hidden"
      />

      <img 
      src="https://admin.balwaan.com/uploads/media/2024/Profile_Completion_Banner.webp" 
      alt="" 
      className="rounded-xl my-3 overflow-hidden w-full"
      />


<CategoriesSlider />
    </main>
  );
}
