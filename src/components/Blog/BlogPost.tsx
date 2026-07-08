import { motion } from "motion/react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import MarkdownContent from "./MarkdownContent";
import type { Post } from "../../lib/types";

const sectionMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
} as const;

type Props = {
  post: Post;
};

const BlogPost = ({ post }: Props) => {
  const { t, i18n } = useTranslation("blog");
  const language = i18n.language.startsWith("pl") ? "pl" : "en";
  const locale = language === "pl" ? post.pl : post.en;

  return (
    <motion.article {...sectionMotion}>
      <Link
        to="/blog"
        className="mb-6 inline-block font-mono text-sm text-terminal-muted hover:text-terminal-accent"
      >
        ← {t("backToList")}
      </Link>

      <header>
        <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-xs text-terminal-muted">
          <time dateTime={post.meta.date}>{post.meta.date}</time>
          {post.meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-terminal-surface px-2 py-0.5 text-terminal-accent"
            >
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="mb-3 font-sans text-3xl font-semibold text-terminal-accent md:text-4xl">
          {locale.title}
        </h1>
        <p className="mb-8 font-sans text-lg text-terminal-muted">
          {locale.description}
        </p>
      </header>

      <MarkdownContent html={locale.html} />
    </motion.article>
  );
};

export default BlogPost;
