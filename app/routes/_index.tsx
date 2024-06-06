import { useTranslation } from "react-i18next";

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "BBDEV" },
    { name: "description", content: "BBDEV portfolio!" },
  ];
};

export default function Index() {
  const { t, i18n } = useTranslation("common");

  const currentLng = i18n.language;

  const changeLocaleHandler = () => {
    i18n.changeLanguage(currentLng === "en" ? "pl" : "en");
  };

  return (
    <div className="ml-4">
      <span className="text-3xl font-bold underline">{t("welcome")}</span>
      <button className="block mt-8" onClick={changeLocaleHandler}>
        {currentLng === "en" ? "PL" : "EN"}
      </button>
    </div>
  );
}
