import type { CaseCardProps } from "@/components/CaseCard/CaseCard";
import aethraOne from "@/assets/cases/aethra-one.webp";
import fwd from "@/assets/cases/fwd.webp";
import nordicFrame from "@/assets/cases/nordic-frame.webp";

/** Кейси для каруселі першого екрана. Посилання поки ведуть на розділ «Роботи». */
export const heroCases: CaseCardProps[] = [
  {
    title: "FWD",
    format: "Багатосторінковий сайт",
    image: fwd,
    alt: "FWD — сайт креативної студії",
    href: "#works",
  },
  {
    title: "AETHRA ONE",
    format: "Багатосторінковий сайт",
    image: aethraOne,
    alt: "AETHRA ONE — сайт електромобіля",
    href: "#works",
  },
  {
    title: "Nordic Frame",
    format: "Лендінг",
    image: nordicFrame,
    alt: "Nordic Frame — сайт архітектурного бренду",
    href: "#works",
  },
];
