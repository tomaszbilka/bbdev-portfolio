import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const sectionMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
} as const;

const links = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/tomasz-bi%C5%82ka-bbdev/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    id: "github",
    href: "https://github.com/tomaszbilka",
    icon: FaGithub,
    label: "GitHub",
  },
  {
    id: "email",
    href: "mailto:tomaszbilka@gmail.com",
    icon: SiGmail,
    label: "Email",
  },
];

const Contact = () => {
  const { t } = useTranslation("contact");

  return (
    <motion.section className="py-8" {...sectionMotion}>
      <h1 className="mb-6 font-mono text-2xl font-medium text-terminal-accent">
        {t("contact")}
      </h1>

      <p className="mb-8 font-sans text-terminal-muted">{t("info")}</p>

      <div className="flex flex-wrap gap-6">
        {links.map((link) => (
          <motion.a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-lg bg-terminal-surface/50 px-5 py-3 transition-colors hover:bg-terminal-surface hover:text-terminal-accent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <link.icon className="h-6 w-6 transition-colors group-hover:text-terminal-accent" />
            <span className="font-sans font-medium">{link.label}</span>
          </motion.a>
        ))}
      </div>

      <p className="mt-8 font-mono text-sm text-terminal-muted">
        {t("emailMe")}
      </p>
    </motion.section>
  );
};

export default Contact;
