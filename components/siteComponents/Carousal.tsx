'use client'
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { heroSlider } from "@/constants/files";
import { Button } from "@/components/ui/button"

export function HeroCarousal() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    interface Slide {
        imgUrlDesktop?: string;
        imgUrlMobile?: string;
        title: string;
        description?: string;
        buttonText?: string;
    }

    const slides: Slide[] = heroSlider.Slides;

    const renderSlide = (slide: Slide) => (
        <CarouselItem key={slide.title}>
            <div
                className="p-0 relative bg-center bg-cover"
            >
                {/* Choose image based on screen size */}
                <img
                    src={useMediaQuery('(max-width: 768px)') ? slide.imgUrlMobile || slide.imgUrlDesktop : slide.imgUrlDesktop}
                    alt={slide.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                <CardContent className="flex flex-col items-center justify-between p-6 absolute top-0 w-full h-full  z-10">

                    <h2 className="text-bold text-3xl">{slide.title}</h2>

                    <p>{slide.description}</p>

                    {slide.buttonText && <Button>{slide.buttonText}</Button>}

                </CardContent>
            </div>
        </CarouselItem>
    );

    // Media query hook (replace with your implementation)
    const useMediaQuery = (query: string) => {
        const [matches, setMatches] = React.useState(window.matchMedia(query).matches);
        React.useEffect(() => {
            const media = window.matchMedia(query);
            const handleChange = () => setMatches(media.matches);
            media.addEventListener('change', handleChange);
            return () => media.removeEventListener('change', handleChange);
        }, [query]);
        return matches;
    };

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full relative"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>

                {slides.map(renderSlide)}

            </CarouselContent>
            <CarouselPrevious className="absolute left-1 opacity-45" />
            <CarouselNext className="absolute right-1 opacity-45" />
        </Carousel>
    );
}
