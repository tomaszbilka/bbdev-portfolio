import { TbArrowsDown } from "react-icons/tb";
import { useTranslation } from "react-i18next";

import type { RefObject } from "react";

import Greeting from "./Greeting";
import LanguageSwitch from "../languageSwitch";

type TProps = {
  scrollRef: RefObject<HTMLDivElement>;
};

const Header = ({ scrollRef }: TProps) => {
  const { t } = useTranslation();

  const scrollHandler = () => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="my-header">
      <Greeting />
      <button className="my-header__container" onClick={scrollHandler}>
        <div className="my-header__title">{t("exploreMore")}</div>
        <div className="my-header__arrow-container">
          <TbArrowsDown className="arrows" />
        </div>
      </button>
      <LanguageSwitch />
    </header>
  );
};

export default Header;
