import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const img = "https://placehold.co/1320x612";

export const EventCarousel = () => {
  return (
    <div className="my-4">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <CarouselItem className="pl-2 md:pl-4" key={i}>
              <img src={img} alt="" className="object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
