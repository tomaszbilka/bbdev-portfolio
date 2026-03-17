import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const Bio = () => {
  const { t } = useTranslation("about");

  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-start md:gap-12">
        <div className="min-w-0 order-2 md:order-1">
          <motion.h1
            className="mb-2 font-sans text-3xl font-semibold text-terminal-accent md:text-4xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("whoAmI")}
          </motion.h1>
          <motion.p
            className="font-sans leading-relaxed text-terminal-text/90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t("description")}
          </motion.p>
        </div>
        <motion.div
          className="order-1 flex justify-center md:order-2 md:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ perspective: 1000 }}
        >
          <motion.div
            className="rounded-lg bg-terminal-bg p-2 shadow-xl ring-1 ring-terminal-surface"
            whileHover={{
              rotateY: 18,
              rotateX: -6,
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
            transition={{ duration: 0.3 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src="/images/shelby_avatar.png"
              alt="Tomasz Bilka"
              className="h-40 w-40 shrink-0 rounded-md object-cover object-top sm:h-48 sm:w-48"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Bio;
