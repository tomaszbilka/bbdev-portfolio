import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

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
    <motion.section
      className="py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="mb-6 font-mono text-2xl font-medium text-terminal-accent"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {t("contact")}
      </motion.h1>

      <motion.p
        className="mb-8 font-sans text-terminal-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {t("info")}
      </motion.p>

      <div className="flex flex-wrap gap-6">
        {links.map((link, index) => (
          <motion.a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-lg bg-terminal-surface/50 px-5 py-3 transition-colors hover:bg-terminal-surface hover:text-terminal-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <link.icon className="h-6 w-6 transition-colors group-hover:text-terminal-accent" />
            <span className="font-sans font-medium">{link.label}</span>
          </motion.a>
        ))}
      </div>

      <motion.p
        className="mt-8 font-mono text-sm text-terminal-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        {t("emailMe")}
      </motion.p>
    </motion.section>
  );
};

export default Contact;
