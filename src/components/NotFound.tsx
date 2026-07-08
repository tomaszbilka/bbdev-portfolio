import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";

const sectionMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
} as const;

const NotFound = () => {
  const { t } = useTranslation("notFound");
  const { pathname } = useLocation();

  return (
    <motion.section {...sectionMotion}>
      <p className="mb-4 font-mono text-sm text-terminal-muted">
        <span className="text-terminal-accent">$</span> cat {pathname}
      </p>
      <p className="mb-6 font-mono text-sm text-red-400">
        cat: file not found: {pathname}
      </p>

      <h1 className="mb-3 font-sans text-3xl font-semibold text-terminal-accent md:text-4xl">
        {t("title")}
      </h1>
      <p className="mb-8 font-sans text-lg text-terminal-muted">
        {t("message")}
      </p>

      <p className="mb-4 font-mono text-sm text-terminal-muted">{t("hint")}</p>
      <div className="flex flex-wrap gap-4">
        <Link
          to="/"
          className="font-mono text-sm text-terminal-accent transition-colors hover:text-terminal-text"
        >
          [~/ {t("backHome")}]
        </Link>
        <Link
          to="/blog"
          className="font-mono text-sm text-terminal-accent transition-colors hover:text-terminal-text"
        >
          [~/blog {t("backBlog")}]
        </Link>
      </div>
    </motion.section>
  );
};

export default NotFound;
