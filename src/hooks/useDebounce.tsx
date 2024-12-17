import { useEffect } from "react";

interface UseDebounceProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencyArray: any[];
  handleDebounce: () => void;
  delay: number;
}

export const useDebounce = ({
  delay,
  dependencyArray,
  handleDebounce,
}: UseDebounceProps) => {
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      handleDebounce();
    }, delay);
    return () => clearTimeout(delayInputTimeoutId);
  }, [...dependencyArray]);
};
