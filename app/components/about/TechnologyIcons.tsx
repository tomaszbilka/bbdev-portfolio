import { useRef } from "react";
import { IoLogoJavascript, IoLogoHtml5, IoLogoCss3 } from "react-icons/io5";
import {
  SiGraphql,
  SiMui,
  SiNestjs,
  SiRemix,
  SiSass,
  SiTailwindcss,
} from "react-icons/si";
import { DiMysql } from "react-icons/di";
import { FaReact } from "react-icons/fa";
import useIsVisible from "~/hooks/useIsVisible";

const TechnologyIcons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible({ ref, threshold: 1, useOnce: false });

  return (
    <div className="icons" ref={ref}>
      <IoLogoJavascript
        className={`icon icon__js ${isVisible ? "icon-animation" : ""}`}
      />
      <SiSass
        className={`icon icon__sass ${isVisible ? "icon-animation" : ""}`}
      />
      <IoLogoCss3
        className={`icon icon__css ${isVisible ? "icon-animation" : ""}`}
      />
      <FaReact
        className={`icon icon__react ${isVisible ? "icon-animation" : ""}`}
      />
      <SiRemix
        className={`icon icon__remix ${isVisible ? "icon-animation" : ""}`}
      />
      <IoLogoHtml5
        className={`icon icon__html ${isVisible ? "icon-animation" : ""}`}
      />
      <SiGraphql
        className={`icon icon__graphql ${isVisible ? "icon-animation" : ""}`}
      />
      <SiNestjs
        className={`icon icon__nest ${isVisible ? "icon-animation" : ""}`}
      />
      <SiMui
        className={`icon icon__mui ${isVisible ? "icon-animation" : ""}`}
      />
      <SiTailwindcss
        className={`icon icon__tailwind ${isVisible ? "icon-animation" : ""}`}
      />
      <DiMysql
        className={`icon icon__sql ${isVisible ? "icon-animation" : ""}`}
      />
    </div>
  );
};

export default TechnologyIcons;
