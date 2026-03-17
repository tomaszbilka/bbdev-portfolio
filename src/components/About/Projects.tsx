import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

type Project = {
  title: string;
  period: string;
  description: string;
  contributions: string;
};

const Projects = () => {
  const { t } = useTranslation("about");
  const projects = t("projectList", { returnObjects: true }) as Project[];

  if (!Array.isArray(projects) || projects.length === 0) return null;

  return (
    <motion.section
      className="mt-16"
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
        {t("projects")}
      </motion.h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-terminal-surface" />
        <ul className="space-y-8">
          {projects.map((project, index) => (
            <motion.li
              key={`${project.title}-${index}`}
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
                    {project.title}
                  </h3>
                </div>
                <p className="mb-2 font-mono text-xs text-terminal-accent">
                  {project.period}
                </p>
                <p className="mb-2 font-sans text-sm leading-relaxed text-terminal-muted">
                  {project.description}
                </p>
                <p className="font-mono text-xs text-terminal-muted">
                  {project.contributions}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default Projects;
