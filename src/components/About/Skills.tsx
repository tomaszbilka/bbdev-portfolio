import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { FaReact } from "react-icons/fa";
import { DiMysql } from "react-icons/di";
import {
  IoLogoJavascript,
  IoLogoHtml5,
  IoLogoCss3,
} from "react-icons/io5";
import {
  SiDotnet,
  SiFastapi,
  SiGo,
  SiGraphql,
  SiMui,
  SiNestjs,
  SiOpenai,
  SiPython,
  SiSass,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

type SkillCategory = {
  title: string;
  subtitle: string;
  items: string[];
};

const CATEGORY_KEYS = ["commercial", "growing", "aiLearning"] as const;

const SKILL_NAMES: Record<string, string> = {
  react: "React",
  typescript: "TypeScript",
  javascript: "JavaScript",
  html: "HTML",
  css: "CSS",
  sass: "Sass",
  mui: "MUI",
  tailwind: "Tailwind",
  graphql: "GraphQL",
  nest: "NestJS",
  sql: "SQL",
  python: "Python",
  fastapi: "FastAPI",
  go: "Go",
  dotnet: ".NET",
  ai: "AI",
};

const SKILL_ICONS: Record<string, React.ReactNode> = {
  react: <FaReact className="h-5 w-5" />,
  typescript: <SiTypescript className="h-5 w-5" />,
  javascript: <IoLogoJavascript className="h-5 w-5" />,
  html: <IoLogoHtml5 className="h-5 w-5" />,
  css: <IoLogoCss3 className="h-5 w-5" />,
  sass: <SiSass className="h-5 w-5" />,
  mui: <SiMui className="h-5 w-5" />,
  tailwind: <SiTailwindcss className="h-5 w-5" />,
  graphql: <SiGraphql className="h-5 w-5" />,
  nest: <SiNestjs className="h-5 w-5" />,
  sql: <DiMysql className="h-5 w-5" />,
  python: <SiPython className="h-5 w-5" />,
  fastapi: <SiFastapi className="h-5 w-5" />,
  go: <SiGo className="h-5 w-5" />,
  dotnet: <SiDotnet className="h-5 w-5" />,
  ai: <SiOpenai className="h-5 w-5" />,
};

const Skills = () => {
  const { t } = useTranslation("about");
  const categories = t("skillCategories", { returnObjects: true }) as Record<
    string,
    SkillCategory
  >;

  return (
    <motion.section
      className="mb-16"
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
        {t("skills")}
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-3">
        {CATEGORY_KEYS.map((key, colIndex) => {
          const category = categories[key];
          if (!category) return null;

          return (
            <motion.div
              key={key}
              className="rounded-lg bg-terminal-surface/30 p-5 ring-1 ring-terminal-surface"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.25,
                delay: colIndex * 0.08,
                type: "spring",
                stiffness: 200,
              }}
            >
              <h3 className="font-mono text-base font-medium text-terminal-accent">
                {category.title}
              </h3>
              <p className="mb-4 font-mono text-xs text-terminal-muted">
                {category.subtitle}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skillId, index) => (
                  <motion.div
                    key={skillId}
                    className="flex items-center gap-2 rounded-md bg-terminal-surface/50 px-3 py-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.2,
                      delay: colIndex * 0.08 + index * 0.03,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow: "0 6px 20px -4px rgba(34, 211, 238, 0.2)",
                      transition: { duration: 0.15 },
                    }}
                    title={t(`tooltip.${skillId}`) as string}
                  >
                    <span className="text-terminal-accent">
                      {SKILL_ICONS[skillId]}
                    </span>
                    <span className="font-sans text-sm font-medium text-terminal-text">
                      {SKILL_NAMES[skillId]}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Skills;
