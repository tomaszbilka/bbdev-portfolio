export type PostLocale = {
  title: string;
  description: string;
  content: string;
  html: string;
};

export type PostMeta = {
  slug: string;
  date: string;
  published: boolean;
  tags: string[];
};

export type Post = {
  meta: PostMeta;
  en: PostLocale;
  pl: PostLocale;
};

export type PostSummary = {
  meta: PostMeta;
  en: Pick<PostLocale, "title" | "description">;
  pl: Pick<PostLocale, "title" | "description">;
};

export type SiteSection = "about" | "contributions" | "contact" | "blog";

export function getSectionFromPath(pathname: string): SiteSection {
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/contributions")) return "contributions";
  if (pathname.startsWith("/contact")) return "contact";
  return "about";
}
