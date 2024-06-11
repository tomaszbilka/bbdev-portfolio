import { useRef } from "react";
import Chart from "./Chart";
import useSkills from "./useSkills";
import useIsVisible from "~/hooks/useIsVisible";

const Skills = () => {
  const skills = useSkills();
  const skillsRef = useRef(null);

  const isVivible = useIsVisible({
    ref: skillsRef,
    threshold: 0.6,
    useOnce: true,
  });

  return (
    <section className="skills-section" ref={skillsRef}>
      <div className="skills">
        {skills.map((skill) => (
          <Chart key={skill.name} {...skill} isVivible={isVivible} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
