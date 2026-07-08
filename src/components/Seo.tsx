import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { OG_IMAGE, SAME_AS, SITE_URL } from "../config/site";

type Section = "about" | "contributions" | "contact";

type SeoProps = {
  section: Section;
};

const LOCALE_MAP = {
  en: "en_US",
  pl: "pl_PL",
} as const;

const Seo = ({ section }: SeoProps) => {
  const { t, i18n } = useTranslation("seo");
  const language = i18n.language.startsWith("pl") ? "pl" : "en";
  const sectionLabel = t(`sections.${section}`);
  const title =
    section === "about"
      ? t("defaultTitle")
      : `${sectionLabel} | Tomasz Bilka`;
  const description = t("defaultDescription");
  const ogLocale = LOCALE_MAP[language];
  const alternateLocale = language === "en" ? LOCALE_MAP.pl : LOCALE_MAP.en;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tomasz Bilka",
    jobTitle: t("personJobTitle"),
    url: SITE_URL,
    image: OG_IMAGE,
    sameAs: [...SAME_AS],
    knowsAbout: t("knowsAbout", { returnObjects: true }) as string[],
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content={t("ogTitle")} />
      <meta property="og:description" content={t("ogDescription")} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Tomasz Bilka" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={alternateLocale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t("ogTitle")} />
      <meta name="twitter:description" content={t("ogDescription")} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>
  );
};

export default Seo;
