import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { SliderArrow } from "./SliderArrow";
import { GameBanner } from "./GameBanner";
import { GameProps } from "../App";

interface GamesSliderProps {
  games: GameProps[];
}

export function GamesSlider({ games }: GamesSliderProps) {
  const slidesPerView = 6;
  const numberSlides = slidesPerView + 1;
  const [slidesDetails, setSlidesDetails] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    rtl: false,
    breakpoints: {
      "(max-width: 1200px)": {
        slides: {
          perView: 5,
        },
      },
      "(max-width: 1024px)": {
        slides: {
          perView: 3,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 2,
        },
      },
      "(max-width: 460px)": {
        slides: {
          perView: 1,
        },
      },
    },
    slides: {
      number: numberSlides,
      perView: slidesPerView,
      spacing: 3,
    },
    mode: "free-snap",
    detailsChanged: (slider) => {
      setSlidesDetails(slider.track.details.slides);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="navigation-wrapper relative w-full mt-16 px-6">
      <div ref={sliderRef} className="keen-slider max-w-[1200px] mx-auto">
        {[...Array(numberSlides).keys()].map((idx) => {
          return (
            <div key={idx} className="keen-slider__slide">
              {slidesDetails && (
                <GameBanner
                  bannerUrl={games[idx]?.bannerUrl}
                  title={games[idx]?.title}
                  adsCount={games[idx]?._count.ads}
                />
              )}
            </div>
          );
        })}
      </div>
      {loaded && instanceRef?.current && (
        <>
          <SliderArrow
            left
            onClick={(e: any) => e.stopPropagation() || instanceRef?.current?.prev()}
            disabled={false}
          />

          <SliderArrow
            onClick={(e: any) => e.stopPropagation() || instanceRef?.current?.next()}
            disabled={false}
          />
        </>
      )}
    </div>
  );
}
