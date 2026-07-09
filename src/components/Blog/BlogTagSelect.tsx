import { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";

type Props = {
  tags: string[];
  value: string[];
  onChange: (tags: string[]) => void;
  allTagsLabel: string;
  filterLabel: string;
  selectedCountLabel: (count: number) => string;
};

const BlogTagSelect = ({
  tags,
  value,
  onChange,
  allTagsLabel,
  filterLabel,
  selectedCountLabel,
}: Props) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const triggerLabel =
    value.length === 0
      ? allTagsLabel
      : value.length === 1
        ? `#${value[0]}`
        : selectedCountLabel(value.length);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const toggleTag = (tag: string) => {
    onChange(
      value.includes(tag)
        ? value.filter((selected) => selected !== tag)
        : [...value, tag]
    );
  };

  return (
    <div ref={rootRef} className="relative w-full sm:w-56">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={filterLabel}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-terminal-surface bg-terminal-surface/30 px-3 py-2 font-mono text-sm text-terminal-text transition-colors hover:border-terminal-accent/40 focus:border-terminal-accent focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:ring-offset-2 focus:ring-offset-terminal-bg"
      >
        <span className="truncate">{triggerLabel}</span>
        <span className="text-terminal-accent" aria-hidden="true">
          {open ? "▴" : "▾"}
        </span>
      </button>

      {open && (
        <motion.ul
          id={listboxId}
          role="listbox"
          aria-multiselectable="true"
          aria-label={filterLabel}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute z-20 mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-terminal-surface bg-terminal-bg py-1 shadow-lg shadow-black/30"
        >
          {tags.map((tag) => {
            const selected = value.includes(tag);
            return (
              <li key={tag} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left font-mono text-sm transition-colors hover:bg-terminal-surface/60 ${
                    selected ? "text-terminal-accent" : "text-terminal-text"
                  }`}
                >
                  <span
                    className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                      selected
                        ? "border-terminal-accent bg-terminal-accent/20 text-terminal-accent"
                        : "border-terminal-surface text-transparent"
                    }`}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  #{tag}
                </button>
              </li>
            );
          })}
        </motion.ul>
      )}
    </div>
  );
};

export default BlogTagSelect;
