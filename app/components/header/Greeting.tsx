import { useState } from "react";
import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";

const Greeting = () => {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const { t } = useTranslation();

  const frontEnd = "front-end developer";
  const fullStack = "full-stack developer";

  return (
    <div className="greeting">
      <div>
        <span>{t("hello")}</span>
        <span className="greeting__name">Tomasz Bilka</span>.
      </div>
      <div className="greeting__role">
        {isAnimationFinished ? (
          frontEnd
        ) : (
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .pauseFor(500)
                .typeString(fullStack)
                .pauseFor(1000)
                .deleteAll()
                .typeString(frontEnd)
                .callFunction(() => setIsAnimationFinished(true))
                .start();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Greeting;
