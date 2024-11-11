import { Card, CardContent } from "../ui/card";
import { useLocale, useTranslations } from "next-intl";

type Category = {
  name: string;
  image: string;
};

const elements: {
  [key: string]: Category[];
} = {
  en: [
    {
      name: "Music",
      image:
        "https://www.showtechproductions.com/wp-content/uploads/2024/03/hanny-naibaho-aWXVxy8BSzc-unsplash.jpg",
    },
    {
      name: "Comedy",
      image:
        "https://www.visitmelbourne.com/-/media/atdw/melbourne/whats-on/theatre-and-performing-arts/comedy/9d84a30a9f6c8eb3abe9aa67dafed858_1600x1200.jpeg?ts=20240506330243",
    },
    {
      name: "Theater",
      image:
        "https://thehanovertheatre.org/wp-content/uploads/2024/10/UK-Cast-of-Aint-Too-Proud-photo-by-Johan-Persson.png",
    },
    {
      name: "Sports",
      image:
        "https://www.economist.com/cdn-cgi/image/width=1424,quality=80,format=auto/content-assets/images/20230318_STP002.jpg",
    },
  ],
  es: [
    {
      name: "Musica",
      image:
        "https://www.showtechproductions.com/wp-content/uploads/2024/03/hanny-naibaho-aWXVxy8BSzc-unsplash.jpg",
    },
    {
      name: "Comedia",
      image:
        "https://www.visitmelbourne.com/-/media/atdw/melbourne/whats-on/theatre-and-performing-arts/comedy/9d84a30a9f6c8eb3abe9aa67dafed858_1600x1200.jpeg?ts=20240506330243",
    },
    {
      name: "Teatro",
      image:
        "https://thehanovertheatre.org/wp-content/uploads/2024/10/UK-Cast-of-Aint-Too-Proud-photo-by-Johan-Persson.png",
    },
    {
      name: "Deportes",
      image:
        "https://www.economist.com/cdn-cgi/image/width=1424,quality=80,format=auto/content-assets/images/20230318_STP002.jpg",
    },
  ],
};

export const CategoryList = () => {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="mb-8 text-center text-2xl font-bold">{t("category")}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {elements[locale].map((category: Category) => (
          <Card
            key={category.name}
            className="relative h-40 transition-transform hover:scale-105"
          >
            <CardContent className="p-0">
              <h3 className="absolute bottom-2 left-2 text-lg font-semibold text-white">
                {category.name}
              </h3>
              <img
                src={category.image}
                alt={`${category.name} category`}
                className="h-40 w-full object-cover"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
