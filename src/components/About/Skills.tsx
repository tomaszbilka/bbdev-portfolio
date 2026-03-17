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

type Skill = {
  id: string;
  name: string;
  icon: React.ReactNode;
  level: number;
};

const Skills = () => {
  const { t } = useTranslation("about");

  const skills: Skill[] = [
    {
      id: "react",
      name: "React",
      icon: <FaReact className="h-6 w-6" />,
      level: 85,
    },
    {
      id: "typescript",
      name: "TypeScript",
      icon: <SiTypescript className="h-6 w-6" />,
      level: 75,
    },
    {
      id: "javascript",
      name: "JavaScript",
      icon: <IoLogoJavascript className="h-6 w-6" />,
      level: 70,
    },
    {
      id: "html",
      name: "HTML",
      icon: <IoLogoHtml5 className="h-6 w-6" />,
      level: 65,
    },
    {
      id: "css",
      name: "CSS",
      icon: <IoLogoCss3 className="h-6 w-6" />,
      level: 60,
    },
    {
      id: "sass",
      name: "Sass",
      icon: <SiSass className="h-6 w-6" />,
      level: 60,
    },
    {
      id: "mui",
      name: "MUI",
      icon: <SiMui className="h-6 w-6" />,
      level: 60,
    },
    {
      id: "tailwind",
      name: "Tailwind",
      icon: <SiTailwindcss className="h-6 w-6" />,
      level: 60,
    },
    {
      id: "python",
      name: "Python",
      icon: <SiPython className="h-6 w-6" />,
      level: 40,
    },
    {
      id: "fastapi",
      name: "FastAPI",
      icon: <SiFastapi className="h-6 w-6" />,
      level: 50,
    },
    {
      id: "go",
      name: "Go",
      icon: <SiGo className="h-6 w-6" />,
      level: 40,
    },
    {
      id: "dotnet",
      name: ".NET",
      icon: <SiDotnet className="h-6 w-6" />,
      level: 10,
    },
    {
      id: "ai",
      name: "AI",
      icon: <SiOpenai className="h-6 w-6" />,
      level: 50,
    },
    {
      id: "graphql",
      name: "GraphQL",
      icon: <SiGraphql className="h-6 w-6" />,
      level: 50,
    },
    {
      id: "sql",
      name: "SQL",
      icon: <DiMysql className="h-6 w-6" />,
      level: 30,
    },
    {
      id: "nest",
      name: "NestJS",
      icon: <SiNestjs className="h-6 w-6" />,
      level: 20,
    },
  ];

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            className="group flex items-center gap-4 rounded-lg bg-terminal-surface/50 px-4 py-3 transition-colors hover:bg-terminal-surface"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.2,
              delay: index * 0.02,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{
              scale: 1.05,
              y: -4,
              boxShadow: "0 8px 25px -5px rgba(34, 211, 238, 0.15)",
              transition: { duration: 0.15 },
            }}
            title={t(`tooltip.${skill.id}`) as string}
          >
            <div className="text-terminal-accent">{skill.icon}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-sans font-medium text-terminal-text">
                {skill.name}
              </p>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-terminal-bg">
                <motion.div
                  className="h-full rounded-full bg-terminal-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.05 + index * 0.02 }}
                />
              </div>
            </div>
            <span className="font-mono text-sm text-terminal-muted">
              {skill.level}%
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;
