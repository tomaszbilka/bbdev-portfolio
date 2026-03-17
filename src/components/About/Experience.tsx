import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

type Job = {
  title: string;
  company: string;
  period: string;
  description: string;
};

const Experience = () => {
  const { t } = useTranslation("about");
  const jobs = t("jobs", { returnObjects: true }) as Job[];

  if (!Array.isArray(jobs) || jobs.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="mb-8 font-mono text-xl font-medium text-terminal-accent"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {t("experience")}
      </motion.h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-terminal-surface" />
        <ul className="space-y-8">
          {jobs.map((job, index) => (
            <motion.li
              key={`${job.title}-${job.company}-${index}`}
              className="relative pl-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <span className="absolute left-2.5 h-3 w-3 rounded-full bg-terminal-accent" />
              <div className="rounded-lg bg-terminal-surface/30 p-4 transition-colors hover:bg-terminal-surface/50">
                <div className="mb-1 flex flex-wrap items-baseline gap-2">
                  <h3 className="font-sans text-lg font-semibold text-terminal-text">
                    {job.title}
                  </h3>
                  <span className="font-mono text-sm text-terminal-accent">
                    · {job.company}
                  </span>
                </div>
                <p className="mb-2 font-mono text-xs text-terminal-muted">
                  {job.period}
                </p>
                <p className="font-sans text-sm leading-relaxed text-terminal-muted">
                  {job.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default Experience;
