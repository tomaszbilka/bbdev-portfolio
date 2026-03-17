import { motion } from "motion/react";

type NavItem = "about" | "contact";

type Props = {
  activeSection: NavItem;
  onNavigate: (section: NavItem) => void;
};

const TerminalNav = ({ activeSection, onNavigate }: Props) => {

  const navItems: { id: NavItem; label: string }[] = [
    { id: "about", label: "about" },
    { id: "contact", label: "contact" },
  ];

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
        <span className="text-terminal-text">{activeSection}</span>
        <span className="text-terminal-accent">$</span>
        <span className="animate-pulse">▋</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`transition-colors hover:text-terminal-accent focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:ring-offset-2 focus:ring-offset-terminal-bg rounded px-1 ${
              activeSection === item.id
                ? "text-terminal-accent font-medium"
                : "text-terminal-muted hover:text-terminal-text"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            [system:~/ {item.label}]
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default TerminalNav;
