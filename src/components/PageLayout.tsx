import { useLocation } from "react-router";

import LanguageSwitch from "./LanguageSwitch";
import Seo from "./Seo";
import TerminalNav from "./TerminalNav";
import { getSectionFromPath } from "../lib/types";

type Props = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  const location = useLocation();
  const section = getSectionFromPath(location.pathname);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text antialiased">
      <Seo section={section} />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-50 -mx-4 mb-12 flex flex-col gap-4 border-b border-terminal-surface/60 bg-terminal-bg/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:-mx-8 lg:px-8">
          <TerminalNav />
          <LanguageSwitch />
        </header>

        <main className="min-h-[60vh]">{children}</main>

        <footer className="mt-16 border-t border-terminal-surface py-6 text-center font-mono text-sm text-terminal-muted">
          bbdev © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};

export default PageLayout;
