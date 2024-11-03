import { AppEventType } from "@/types/global.types";

const events: AppEventType[] = [
  {
    id: "1",
    name: "UFC 309",
    description:
      "The Ultimate Fighting Championship returns to the T-Mobile Arena in Las Vegas, Nevada for UFC 309.",
    date: "2024-11-28",
    location: "Las Vegas, Nevada",
    image:
      "https://img.msg.com/wp-content/uploads/2024/08/241116_MSG_UFC309_EDPVLP_1024x576-3.jpg?w=600&h=400",
    price: 59.99,
    capacity: 20000,
    status: "published",
    category: "Sports",
    organizer: "UFC",
  },
  {
    id: "2",
    name: "Kanye West - 'Vultures' Listening Party",
    description:
      "Join Kanye West for an exclusive listening party of his latest album, 'Vultures,' at an intimate venue in Los Angeles. Be one of the first to experience Kanye's new music alongside other fans and special guests.",
    date: "2024-12-15",
    location: "Los Angeles, CA",
    image:
      "https://nypost.com/wp-content/uploads/sites/2/2023/12/bgus_2796845_007-1.jpg",
    price: 249.99,
    capacity: 500,
    status: "published",
    category: "Music",
    organizer: "Yeezy Events",
  },
  {
    id: "3",
    name: "Tech Innovators Conference 2024",
    description:
      "An annual gathering of the brightest minds in technology to discuss the future of innovation.",
    date: "2024-12-12",
    location: "San Francisco, CA",
    image:
      "https://www.fischtankpr.com/wp-content/uploads/2023/10/shutterstock_2232908089-scaled.jpg",
    price: 299.99,
    capacity: 1000,
    status: "published",
    category: "Conference",
    organizer: "TechWorld",
  },
  {
    id: "4",
    name: "Broadway Night: Phantom of the Opera",
    description:
      "An exclusive Broadway showing of the classic musical, Phantom of the Opera.",
    date: "2025-01-15",
    location: "New York, NY",
    image:
      "https://broadwaydirect.com/wp-content/uploads/2022/11/Phantom-Closing-Delayed-1200x450-1-800x450.jpg",
    price: 89.99,
    capacity: 1200,
    status: "published",
    category: "Theater",
    organizer: "Broadway Co.",
  },
  {
    id: "5",
    name: "Miami Food and Wine Festival",
    description:
      "Taste some of the best food and wine from around the world at the annual Miami Food and Wine Festival.",
    date: "2025-02-10",
    location: "Miami, FL",
    image:
      "https://dvcshop.com/wp-content/uploads/2021/04/International-Food-and-Wine-Festival_Full_25561.jpg",
    price: 39.99,
    capacity: 3000,
    status: "published",
    category: "Festival",
    organizer: "Food Lovers Inc.",
  },
  {
    id: "6",
    name: "NBA All-Star Game 2025",
    description:
      "Watch the NBA’s top players face off in this year’s All-Star Game, held in Chicago.",
    date: "2025-02-16",
    location: "Chicago, IL",
    image:
      "https://cdn.nba.com/teams/uploads/sites/1610612744/2023/11/1280x720_SFBA.jpg",
    price: 99.99,
    capacity: 20000,
    status: "published",
    category: "Sports",
    organizer: "NBA",
  },
  {
    id: "7",
    name: "International Film Festival",
    description:
      "Join filmmakers and enthusiasts from around the world for the International Film Festival in Berlin.",
    date: "2025-03-03",
    location: "Berlin, Germany",
    image:
      "https://assets.exploreedmonton.com/images/_1200x630_crop_center-center_none/Edmonton_International-Film-Festival_-Credit_Cassian_Soltykevych.jpg",
    price: 49.99,
    capacity: 5000,
    status: "published",
    category: "Film",
    organizer: "Berlin Film Society",
  },
  {
    id: "8",
    name: "World Marathon Challenge",
    description:
      "Run a marathon on each continent over seven days in this ultimate challenge for runners.",
    date: "2025-04-20",
    location: "Global",
    image:
      "https://www.trailrun.es/uploads/s1/39/69/53/article-world-marathon-challenge-2017-589052d875198.jpeg",
    price: 1500.0,
    capacity: 50,
    status: "published",
    category: "Sports",
    organizer: "Global Marathon Society",
  },
  {
    id: "9",
    name: "Comic-Con International 2025",
    description:
      "Meet your favorite creators and explore exclusive content at the 2025 Comic-Con in San Diego.",
    date: "2025-07-23",
    location: "San Diego, CA",
    image:
      "https://www.comic-con.org/uploads/2023/10/museum-entrance-hero-1024x679-1.webp",
    price: 79.99,
    capacity: 130000,
    status: "published",
    category: "Convention",
    organizer: "Comic-Con International",
  },
  {
    id: "10",
    name: "Jazz Festival",
    description:
      "Celebrate world-class jazz music at the annual New Orleans Jazz Festival.",
    date: "2025-05-01",
    location: "New Orleans, LA",
    image: "https://www.caravanjazz.es/wp-content/uploads/2020/01/fb-roots.jpg",
    price: 29.99,
    capacity: 10000,
    status: "published",
    category: "Festival",
    organizer: "Jazz Foundation",
  },
];

export default events;
