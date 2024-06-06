import { useTranslation } from "react-i18next";
import { LOCALE } from "./constants";

const LanguageSwitch = () => {
  const { i18n } = useTranslation("common");

  const currentLng = i18n.language;

  const changeLocaleHandler = () => {
    i18n.changeLanguage(currentLng === LOCALE.en ? LOCALE.pl : LOCALE.en);
  };

  return (
    <button className="px-4 py-2 border" onClick={changeLocaleHandler}>
      {currentLng === "en" ? LOCALE.pl.toUpperCase() : LOCALE.en.toUpperCase()}
    </button>
  );
};

export default LanguageSwitch;
