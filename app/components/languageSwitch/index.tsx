import { useTranslation } from "react-i18next";
import { LOCALE } from "./constants";

const LanguageSwitch = () => {
  const { i18n } = useTranslation("common");

  const currentLng = i18n.language;

  const changeLocaleHandler = () => {
    i18n.changeLanguage(currentLng === LOCALE.en ? LOCALE.pl : LOCALE.en);
  };

  return (
    <div className="switch">
      <button className="switch__button" onClick={changeLocaleHandler}>
        {currentLng === "en"
          ? LOCALE.pl.toUpperCase()
          : LOCALE.en.toUpperCase()}
      </button>
    </div>
  );
};

export default LanguageSwitch;
