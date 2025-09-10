import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const posters = [
  "https://movistararena.co/wp-content/uploads/2024/07/the-smashing-pumpkins-the-world-is-a-vampire-tour-3.jpg",
  "https://movistararena.co/wp-content/uploads/2024/06/borrador-automatico-346.png",
  "https://ucarecdn.com/07e007d1-b571-4747-8b93-d0368fd4c5ae/-/crop/1920x960/0,79/-/preview/",
];

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
          {posters.map((img, i) => (
            <CarouselItem className="pl-2 md:pl-4" key={i}>
              <img
                src={img}
                alt=""
                className="max-h-[40rem] w-full object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
