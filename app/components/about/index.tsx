import { useRef } from "react";
import { useTranslation } from "react-i18next";

import type { RefObject } from "react";

import TechnologyIcons from "./TechnologyIcons";
import useIsVisible from "~/hooks/useIsVisible";

type TProps = {
  scrollRef: RefObject<HTMLDivElement>;
};

const About = ({ scrollRef }: TProps) => {
  const { t } = useTranslation("about");

  const hexagonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible({
    ref: hexagonRef,
    threshold: 0.8,
    useOnce: false,
  });
  const isTextVisible = useIsVisible({ ref: textRef, threshold: 0.4 });

  return (
    <section ref={scrollRef} className="about-section">
      <div className="about">
        <div className="about__hexagon-container">
          <div className="about__hexagon about__hexagon--img"></div>
          <div
            className={`about__hexagon about__hexagon--yellow ${
              isVisible ? "about__hexagon--animation" : ""
            }`}
            ref={hexagonRef}
          ></div>
        </div>

        <div
          className={`about__text-container ${
            isTextVisible ? "about__text-reveal" : ""
          }`}
          ref={textRef}
        >
          <h1 className="about__title">{t("whoAmI")}</h1>
          <p className="about__text">{t("description")}</p>
        </div>
      </div>
      <TechnologyIcons />
    </section>
  );
};

export default About;
