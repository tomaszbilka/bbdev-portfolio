import { useEffect, useState } from "react";

import type { RefObject } from "react";

type TProps = {
  ref: RefObject<HTMLDivElement>;
  threshold?: number;
  useOnce?: boolean;
};

const useIsVisible = ({ ref, threshold = 0.5, useOnce = true }: TProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const hexagon = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        if (useOnce) {
          if (!hasBeenVisible && isIntersecting) {
            setIsVisible(true);
            setHasBeenVisible(true);
          }
        } else {
          setIsVisible(isIntersecting);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold,
      }
    );

    if (hexagon) {
      observer.observe(hexagon);
    }

    return () => {
      if (hexagon) {
        observer.unobserve(hexagon);
      }
    };
  }, [hasBeenVisible, threshold, ref, useOnce]);

  return isVisible;
};

export default useIsVisible;
