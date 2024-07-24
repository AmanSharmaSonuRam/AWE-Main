import { CategorySlider01 } from "@/components/siteComponents/CategorySlider01";
import { HeroCarousal } from "@/components/siteComponents/HeroCarousal";
import Image from "next/image";
import ProductCarousal01 from "@/components/siteComponents/ProductCarousal01";
import { Separator } from "@/components/ui/separator";
import { ComplexMenu01 } from "@/components/siteComponents/ComplexMenu01";
import { TrustSection01 } from "@/components/siteComponents/TrustSection01";

export default function Home() {
  return (
    <main className="">


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


      <CategorySlider01 />
      <ComplexMenu01/>
      <ProductCarousal01 />
      <Separator className="py-2 my-2"/>
      <TrustSection01 />


    </main>
  );
}
