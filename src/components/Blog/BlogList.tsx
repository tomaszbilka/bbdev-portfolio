import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import BlogTagSelect from "./BlogTagSelect";
import type { PostSummary } from "../../lib/types";

const sectionMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
} as const;

const inputClassName =
  "w-full rounded-lg border border-terminal-surface bg-terminal-surface/30 py-2 pl-7 pr-3 font-mono text-sm text-terminal-text placeholder:text-terminal-muted transition-colors hover:border-terminal-accent/40 focus:border-terminal-accent focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:ring-offset-2 focus:ring-offset-terminal-bg";

const buttonClassName =
  "shrink-0 rounded-lg border border-terminal-surface px-3 py-2 font-mono text-sm text-terminal-muted transition-colors hover:border-terminal-accent hover:text-terminal-accent focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:ring-offset-2 focus:ring-offset-terminal-bg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-terminal-surface disabled:hover:text-terminal-muted";

type Props = {
  posts: PostSummary[];
};

const BlogList = ({ posts }: Props) => {
  const { t, i18n } = useTranslation("blog");
  const language = i18n.language.startsWith("pl") ? "pl" : "en";
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const post of posts) {
      for (const postTag of post.meta.tags) {
        tags.add(postTag);
      }
    }
    return [...tags].sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts.filter((post) => {
      const locale = language === "pl" ? post.pl : post.en;
      const matchesSearch =
        !query || locale.title.toLowerCase().includes(query);
      const matchesTags =
        tags.length === 0 ||
        tags.some((selectedTag) => post.meta.tags.includes(selectedTag));
      return matchesSearch && matchesTags;
    });
  }, [posts, search, tags, language]);

  const hasActiveFilters = search.trim().length > 0 || tags.length > 0;

  const clearFilters = () => {
    setSearch("");
    setTags([]);
  };

  return (
    <motion.section {...sectionMotion}>
      <h1 className="mb-2 font-sans text-3xl font-semibold text-terminal-accent md:text-4xl">
        {t("title")}
      </h1>
      <p className="mb-8 font-sans text-terminal-muted">{t("subtitle")}</p>

      {posts.length === 0 ? (
        <p className="font-mono text-terminal-muted">{t("empty")}</p>
      ) : (
        <>
          <div className="mb-8 rounded-lg border border-terminal-surface bg-terminal-surface/20 p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative min-w-0 flex-1">
                <span
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-terminal-accent"
                  aria-hidden="true"
                >
                  $
                </span>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  aria-label={t("searchPlaceholder")}
                  className={inputClassName}
                />
              </div>

              <BlogTagSelect
                tags={allTags}
                value={tags}
                onChange={setTags}
                allTagsLabel={t("allTags")}
                filterLabel={t("filterByTag")}
                selectedCountLabel={(count) => t("selectedTagsCount", { count })}
              />

              <motion.button
                type="button"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className={buttonClassName}
                whileHover={hasActiveFilters ? { scale: 1.02 } : undefined}
                whileTap={hasActiveFilters ? { scale: 0.98 } : undefined}
              >
                {t("clearFilters")}
              </motion.button>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <p className="font-mono text-terminal-muted">{t("noResults")}</p>
          ) : (
            <ul className="space-y-6">
              {filteredPosts.map((post) => {
                const locale = language === "pl" ? post.pl : post.en;
                return (
                  <li key={post.meta.slug}>
                    <article className="rounded-lg border border-terminal-surface bg-terminal-surface/30 p-5 transition-colors hover:border-terminal-accent/40">
                      <div className="mb-2 flex flex-wrap items-center gap-3 font-mono text-xs text-terminal-muted">
                        <time dateTime={post.meta.date}>{post.meta.date}</time>
                        {post.meta.tags.map((postTag) => (
                          <span
                            key={postTag}
                            className="rounded bg-terminal-bg px-2 py-0.5 text-terminal-accent"
                          >
                            #{postTag}
                          </span>
                        ))}
                      </div>
                      <h2 className="mb-2 font-sans text-xl font-semibold text-terminal-text">
                        <Link
                          to={`/blog/${post.meta.slug}`}
                          className="hover:text-terminal-accent"
                        >
                          {locale.title}
                        </Link>
                      </h2>
                      <p className="mb-4 font-sans text-terminal-text/80">
                        {locale.description}
                      </p>
                      <Link
                        to={`/blog/${post.meta.slug}`}
                        className="font-mono text-sm text-terminal-accent hover:underline"
                      >
                        {t("readMore")} →
                      </Link>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </motion.section>
  );
};

export default BlogList;
