import { motion } from "motion/react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const sectionMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
} as const;

const UnexpectedError = () => {
  const { t } = useTranslation("notFound");

  return (
    <motion.section {...sectionMotion}>
      <p className="mb-4 font-mono text-sm text-red-400">
        <span className="text-terminal-accent">$</span> error: unexpected failure
      </p>

      <h1 className="mb-3 font-sans text-3xl font-semibold text-terminal-accent md:text-4xl">
        {t("errorTitle")}
      </h1>
      <p className="mb-8 font-sans text-lg text-terminal-muted">
        {t("errorMessage")}
      </p>

      <Link
        to="/"
        className="font-mono text-sm text-terminal-accent transition-colors hover:text-terminal-text"
      >
        [~/ {t("backHome")}]
      </Link>
    </motion.section>
  );
};

export default UnexpectedError;
