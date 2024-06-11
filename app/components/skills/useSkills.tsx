import { IoLogoJavascript, IoLogoHtml5, IoLogoCss3 } from "react-icons/io5";
import {
  SiGraphql,
  SiMui,
  SiNestjs,
  SiRemix,
  SiSass,
  SiTailwindcss,
} from "react-icons/si";
import { DiMysql } from "react-icons/di";
import { FaReact } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const useSkills = () => {
  const { t } = useTranslation("skills");

  return [
    {
      extraInfo: t("tooltip.react"),
      icon: <FaReact className="icon icon__react" />,
      level: 85,
      name: "React.js",
    },
    {
      extraInfo: t("tooltip.remix"),
      icon: <SiRemix className="icon icon__remix" />,
      level: 70,
      name: "Remix.js",
    },
    {
      extraInfo: t("tooltip.javascript"),
      icon: <IoLogoJavascript className="icon icon__js" />,
      level: 70,
      name: "Java Script",
    },
    {
      extraInfo: t("tooltip.html"),
      icon: <IoLogoHtml5 className="icon icon__html" />,
      level: 65,
      name: "HTML",
    },
    {
      extraInfo: t("tooltip.css"),
      icon: <IoLogoCss3 className="icon icon__css" />,
      level: 60,
      name: "CSS",
    },
    {
      extraInfo: t("tooltip.sass"),
      icon: <SiSass className="icon icon__sass" />,
      level: 60,
      name: "SASS",
    },
    {
      extraInfo: t("tooltip.mui"),
      icon: <SiMui className="icon icon__mui" />,
      level: 60,
      name: "MUI",
    },
    {
      extraInfo: t("tooltip.tailwind"),
      icon: <SiTailwindcss className="icon icon__tailwind" />,
      level: 60,
      name: "Tailwindcss",
    },
    {
      extraInfo: t("tooltip.graphql"),
      icon: <SiGraphql className="icon icon__graphql" />,
      level: 50,
      name: "GraphQl",
    },
    {
      extraInfo: t("tooltip.sql"),
      icon: <DiMysql className="icon icon__sql" />,
      level: 30,
      name: "SQL",
    },
    {
      extraInfo: t("tooltip.nest"),
      icon: <SiNestjs className="icon icon__nest" />,
      level: 20,
      name: "Nest.js",
    },
  ];
};

export default useSkills;
