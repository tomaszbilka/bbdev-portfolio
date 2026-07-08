import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaApple, FaGooglePlay } from "react-icons/fa";
import { SiNpm } from "react-icons/si";

const sectionMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
} as const;

const Contributions = () => {
  const { t } = useTranslation("contributions");

  return (
    <motion.section className="py-8" {...sectionMotion}>
      <h1 className="mb-2 font-mono text-2xl font-medium text-terminal-accent">
        {t("title")}
      </h1>

      <p className="mb-8 font-sans text-terminal-muted">{t("subtitle")}</p>

      <div className="space-y-6">
        <motion.article
          className="rounded-lg bg-terminal-surface/30 p-5 ring-1 ring-terminal-surface"
          whileHover={{ scale: 1.01 }}
        >
          <p className="mb-2 font-mono text-xs text-terminal-accent">
            {t("npm.label")}
          </p>
          <h2 className="mb-2 font-sans text-lg font-semibold text-terminal-text">
            {t("npm.name")}
          </h2>
          <p className="mb-4 font-sans text-sm leading-relaxed text-terminal-muted">
            {t("npm.description")}
          </p>
          <div className="flex flex-wrap gap-3">
            <motion.a
              href={t("npm.url")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md bg-terminal-surface/50 px-4 py-2 transition-colors hover:bg-terminal-surface hover:text-terminal-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <SiNpm className="h-5 w-5" />
              <span className="font-sans text-sm font-medium">npm</span>
            </motion.a>
            <motion.a
              href={t("npm.repo")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md bg-terminal-surface/50 px-4 py-2 transition-colors hover:bg-terminal-surface hover:text-terminal-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaGithub className="h-5 w-5" />
              <span className="font-sans text-sm font-medium">GitHub</span>
            </motion.a>
          </div>
        </motion.article>

        <motion.article
          className="rounded-lg bg-terminal-surface/30 p-5 ring-1 ring-terminal-surface"
          whileHover={{ scale: 1.01 }}
        >
          <p className="mb-2 font-mono text-xs text-terminal-accent">
            {t("voxapp.label")}
          </p>
          <h2 className="mb-2 font-sans text-lg font-semibold text-terminal-text">
            {t("voxapp.name")}
          </h2>
          <p className="mb-4 font-sans text-sm leading-relaxed text-terminal-muted">
            {t("voxapp.description")}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <motion.a
              href={t("voxapp.googlePlayUrl")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md bg-terminal-surface/50 px-4 py-2 transition-colors hover:bg-terminal-surface hover:text-terminal-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaGooglePlay className="h-5 w-5" />
              <span className="font-sans text-sm font-medium">Google Play</span>
            </motion.a>
            <span className="flex items-center gap-2 rounded-md bg-terminal-surface/30 px-4 py-2 font-sans text-sm text-terminal-muted">
              <FaApple className="h-5 w-5" />
              {t("voxapp.iosNote")}
            </span>
          </div>
        </motion.article>
      </div>
    </motion.section>
  );
};

export default Contributions;
