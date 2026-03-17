import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import TerminalNav from "./TerminalNav";
import LanguageSwitch from "./LanguageSwitch";
import About from "./About";
import Contact from "./Contact";

type Section = "about" | "contact";

function Layout() {
  const [activeSection, setActiveSection] = useState<Section>("about");

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text antialiased">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <TerminalNav
            activeSection={activeSection}
            onNavigate={setActiveSection}
          />
          <LanguageSwitch />
        </header>

        <main className="min-h-[60vh]">
          <AnimatePresence mode="wait">
            {activeSection === "about" ? (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <About />
              </motion.div>
            ) : (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Contact />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-16 border-t border-terminal-surface py-6 text-center font-mono text-sm text-terminal-muted">
          bbdev © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

export default Layout;
