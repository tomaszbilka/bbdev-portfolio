import { motion } from "motion/react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import type { PostSummary } from "../../lib/types";

const sectionMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
} as const;

type Props = {
  posts: PostSummary[];
};

const BlogList = ({ posts }: Props) => {
  const { t, i18n } = useTranslation("blog");
  const language = i18n.language.startsWith("pl") ? "pl" : "en";

  return (
    <motion.section {...sectionMotion}>
      <h1 className="mb-2 font-sans text-3xl font-semibold text-terminal-accent md:text-4xl">
        {t("title")}
      </h1>
      <p className="mb-10 font-sans text-terminal-muted">{t("subtitle")}</p>

      {posts.length === 0 ? (
        <p className="font-mono text-terminal-muted">{t("empty")}</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => {
            const locale = language === "pl" ? post.pl : post.en;
            return (
              <li key={post.meta.slug}>
                <article className="rounded-lg border border-terminal-surface bg-terminal-surface/30 p-5 transition-colors hover:border-terminal-accent/40">
                  <div className="mb-2 flex flex-wrap items-center gap-3 font-mono text-xs text-terminal-muted">
                    <time dateTime={post.meta.date}>{post.meta.date}</time>
                    {post.meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-terminal-bg px-2 py-0.5 text-terminal-accent"
                      >
                        #{tag}
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
    </motion.section>
  );
};

export default BlogList;
