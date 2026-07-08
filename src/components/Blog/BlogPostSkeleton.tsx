import { useTranslation } from "react-i18next";

const BlogPostSkeleton = () => {
  const { t } = useTranslation("blog");

  return (
    <div
      className="animate-pulse"
      role="status"
      aria-label={t("loading")}
    >
      <div className="mb-6 h-4 w-32 rounded bg-terminal-surface" />

      <div className="mb-3 flex gap-3">
        <div className="h-3 w-20 rounded bg-terminal-surface" />
        <div className="h-3 w-16 rounded bg-terminal-surface" />
        <div className="h-3 w-16 rounded bg-terminal-surface" />
      </div>

      <div className="mb-3 h-9 w-3/4 max-w-lg rounded bg-terminal-surface" />
      <div className="mb-8 h-5 w-1/2 max-w-md rounded bg-terminal-surface" />

      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-terminal-surface" />
        <div className="h-4 w-full rounded bg-terminal-surface" />
        <div className="h-4 w-5/6 rounded bg-terminal-surface" />
        <div className="h-4 w-full rounded bg-terminal-surface" />
        <div className="h-4 w-4/6 rounded bg-terminal-surface" />
      </div>
    </div>
  );
};

export default BlogPostSkeleton;
