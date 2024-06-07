import { TbArrowsDown } from "react-icons/tb";
import { useTranslation } from "react-i18next";

import Greeting from "./Greeting";
import LanguageSwitch from "../languageSwitch";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="my-header">
      <Greeting />
      <div role="button" className="my-header__container">
        <div className="my-header__title">{t("exploreMore")}</div>
        <div className="my-header__arrow-container">
          <TbArrowsDown className="arrows" />
        </div>
      </div>
      <LanguageSwitch />
    </div>
  );
};

export default Header;
