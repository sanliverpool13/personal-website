import { StaticImageData } from "next/image";

export interface WorkExperienceType {
  date: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
}

export interface WorkCardType {
  id: string;
  title: string;
  date: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  description: string;
  skills: string[];
  link: {
    href: string;
    text: string;
  };
}
