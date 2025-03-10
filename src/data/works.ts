import PersonalWebsiteImg from "../../public/personalwebsite.png";
import TravelWebsiteImg from "../../public/TravelWebScreenshot.png";
import VeganOneMillionImg from "../../public/VeganOneMillionLanding.png";
import CryptoDashboard from "../../public/crypto-dashboard.png";
import AuthenticationImg from "../../public/authenticationapp.png";

export const Works = [
  {
    id: "1",
    title: "Personal Website",
    description:
      "I designed and built this website to showcase my skills and to share my interests.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "UI Design",
      "Figma",
      "Notion API",
    ],
    date: "2024 - ",
    link: {
      href: "https://www.sanjarjelet.com",
      text: "View The Website",
    },
    imageSrc: PersonalWebsiteImg,
    imageAlt: "A screnshot of landing page",
  },
  {
    id: "2",
    title: "Travel Blog",
    description:
      "Designed and built to blog travels and other interests with my beautiful partner Madison.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "UI Design",
      "Figma",
      "Notion API",
    ],
    date: "2023 - ",
    link: {
      href: "https://www.madisonandsanjar.com/",
      text: "View The Website",
    },
    imageSrc: TravelWebsiteImg,
    imageAlt: "A screnshot of landing page",
  },
  {
    id: "3",
    title: "Vegan One Million",
    description:
      "A board of one million pixels to showcase vegan food businesses and non-alcoholic beverage businesses. Inspired by the one million dollar homepage.",
    skills: ["Next.js", "React", "TypeScript", "Gimp PhotoShop"],
    date: "2025 - ",
    link: {
      href: "https://www.veganonemillion.com/",
      text: "View The Website",
    },
    imageSrc: VeganOneMillionImg,
    imageAlt: "A screnshot of landing page",
  },
  {
    id: "4",
    title: "Crypto Binance OrderBook",
    description:
      "A dashboard to display real-time crypto data in the form of an OrderBook. Data is fetched from the Binance API.",
    skills: ["Vite", "React", "TypeScript", "Figma"],
    date: "2025 - ",
    link: {
      href: "https://crypto-dashboard-rose-nine.vercel.app/",
      text: "View The Website",
    },
    imageSrc: CryptoDashboard,
    imageAlt: "A screnshot of landing page",
  },
  {
    id: "5",
    title: "Mock Authentication App",
    description:
      "A mock authentication app, with login, sign up, and password reset, because forms are deceptively hard.",
    skills: ["Vite", "React", "TypeScript", "Figma", "TailWindCSS V4"],
    date: "2025 - ",
    link: {
      href: "https://sanliverpool13.github.io/authentication-demo/",
      text: "View The Website",
    },
    imageSrc: AuthenticationImg,
    imageAlt: "A screnshot of landing page",
  },
];
