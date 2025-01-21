import PersonalWebsiteImg from "../../public/personalwebsite.png";
import TravelWebsiteImg from "../../public/TravelWebScreenshot.png";
import VeganOneMillionImg from "../../public/VeganOneMillionLanding.png";

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
];
