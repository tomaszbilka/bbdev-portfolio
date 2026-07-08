type Props = {
  html: string;
};

const MarkdownContent = ({ html }: Props) => {
  return (
    <div
      className="blog-content font-sans leading-relaxed text-terminal-text/90"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownContent;
