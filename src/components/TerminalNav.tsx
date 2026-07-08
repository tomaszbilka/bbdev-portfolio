import { motion } from "motion/react";
import { NavLink, useLocation } from "react-router";

import { getSectionFromPath } from "../lib/types";

const navItems = [
  { to: "/", label: "about" },
  { to: "/contributions", label: "contributions" },
  { to: "/blog", label: "blog" },
  { to: "/contact", label: "contact" },
] as const;

const TerminalNav = () => {
  const location = useLocation();
  const activeSection = getSectionFromPath(location.pathname);

  return (
    <motion.nav
      className="font-mono text-sm text-terminal-muted select-none"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="text-terminal-accent">bbdev@portfolio</span>
        <span>:</span>
        <span className="text-terminal-accent">~</span>
        <span>/</span>
        <span className="text-terminal-text">
          {activeSection === "notFound" ? "not-found" : activeSection}
        </span>
        <span className="text-terminal-accent">$</span>
        <span className="animate-pulse">▋</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `transition-colors hover:text-terminal-accent focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:ring-offset-2 focus:ring-offset-terminal-bg rounded px-1 ${
                isActive
                  ? "text-terminal-accent font-medium"
                  : "text-terminal-muted hover:text-terminal-text"
              }`
            }
          >
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              [system:~/ {item.label}]
            </motion.span>
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
};

export default TerminalNav;
