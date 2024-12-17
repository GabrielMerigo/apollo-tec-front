import { useState, useEffect, useMemo } from "react";

type useWindowSizeReturn = {
  windowSize: {
    width: number;
    height: number;
  };
  isMobile: boolean;
};

const useWindowSize: () => useWindowSizeReturn = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width } = windowSize;

  const isMobile = useMemo(() => width < 768, [width]);

  return { windowSize, isMobile };
};

export default useWindowSize;
