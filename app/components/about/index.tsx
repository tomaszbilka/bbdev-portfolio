import { useTranslation } from "react-i18next";

import type { RefObject } from "react";

type TProps = {
  scrollRef: RefObject<HTMLDivElement>;
};

const About = ({ scrollRef }: TProps) => {
  const { t } = useTranslation("about");

  return (
    <section ref={scrollRef} className="about-container">
      <div>ABOUT</div>
    </section>
  );
};

export default About;
