import { useTranslation } from "react-i18next";

import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/header";

export const meta: MetaFunction = () => {
  return [
    { title: "BBDEV" },
    { name: "description", content: "BBDEV portfolio!" },
  ];
};

export default function Index() {
  const { t } = useTranslation("common");

  return (
    <div className="ml-4">
      <span className="text-3xl font-bold underline">{t("welcome")}</span>
      <Header />
    </div>
  );
}
