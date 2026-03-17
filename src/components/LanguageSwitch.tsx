import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { LOCALE } from "@/i18n/constants";

const LanguageSwitch = () => {
  const { i18n } = useTranslation("common");
  const currentLng = i18n.language;

  const handleChange = () => {
    i18n.changeLanguage(currentLng === LOCALE.en ? LOCALE.pl : LOCALE.en);
  };

  const nextLang = currentLng === LOCALE.en ? LOCALE.pl : LOCALE.en;

  return (
    <motion.button
      onClick={handleChange}
      className="rounded-lg border border-terminal-surface px-3 py-1.5 font-mono text-sm text-terminal-muted transition-colors hover:border-terminal-accent hover:text-terminal-accent focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:ring-offset-2 focus:ring-offset-terminal-bg"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Switch to ${nextLang.toUpperCase()}`}
    >
      {nextLang.toUpperCase()}
    </motion.button>
  );
};

export default LanguageSwitch;
