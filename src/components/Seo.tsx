import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useMatches } from "react-router";

import { OG_IMAGE, SAME_AS, SITE_URL } from "../config/site";
import type { Post, SiteSection } from "../lib/types";

type SeoProps = {
  section: SiteSection;
};

const LOCALE_MAP = {
  en: "en_US",
  pl: "pl_PL",
} as const;

const Seo = ({ section }: SeoProps) => {
  const { t, i18n } = useTranslation("seo");
  const { t: tNotFound } = useTranslation("notFound");
  const matches = useMatches();
  const language = i18n.language.startsWith("pl") ? "pl" : "en";
  const ogLocale = LOCALE_MAP[language];
  const alternateLocale = language === "en" ? LOCALE_MAP.pl : LOCALE_MAP.en;

  const postMatch = matches.find(
    (match) => match.data && typeof match.data === "object" && "meta" in match.data
  );
  const post = postMatch?.data as Post | undefined;
  const localeContent = post ? (language === "pl" ? post.pl : post.en) : null;

  const sectionLabel = t(`sections.${section}`);
  const title = post
    ? `${localeContent?.title} | Tomasz Bilka`
    : section === "notFound"
      ? "404 | Tomasz Bilka"
      : section === "about"
        ? t("defaultTitle")
        : `${sectionLabel} | Tomasz Bilka`;
  const description = post
    ? localeContent?.description ?? t("defaultDescription")
    : section === "notFound"
      ? tNotFound("message")
      : t("defaultDescription");
  const canonical = post
    ? `${SITE_URL}/blog/${post.meta.slug}`
    : section === "about" || section === "notFound"
      ? SITE_URL
      : `${SITE_URL}/${section}`;
  const ogType = post ? "article" : "website";

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

  const articleSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: localeContent?.title,
        description: localeContent?.description,
        datePublished: post.meta.date,
        author: {
          "@type": "Person",
          name: "Tomasz Bilka",
          url: SITE_URL,
        },
        url: canonical,
        image: OG_IMAGE,
        keywords: post.meta.tags.join(", "),
      }
    : null;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {section === "notFound" && !post && (
        <meta name="robots" content="noindex" />
      )}
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta
        property="og:title"
        content={post ? localeContent?.title ?? title : t("ogTitle")}
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Tomasz Bilka" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={alternateLocale} />
      {post && (
        <meta property="article:published_time" content={post.meta.date} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={post ? localeContent?.title ?? title : t("ogTitle")}
      />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default Seo;
