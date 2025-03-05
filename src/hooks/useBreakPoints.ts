//from https://gist.github.com/gchumillas/8ff484d74a32df26ef70dba91adf6256/4fcdbf720472d236cd6239cabd58b1a24e7bb667

import { useCallback, useEffect, useMemo, useState } from "react";

const useBreakpoints = <T extends Record<string, number>>(
  breakpoints: T
): keyof T | undefined => {
  const searchBreakpoint = useCallback(
    (breakpoints: { key: string; value: number }[]) => {
      return breakpoints.find((x) => window.innerWidth < x.value)?.key;
    },
    []
  );

  const entries = useMemo(() => {
    return Object.entries(breakpoints)
      .sort((a, b) => a[1] - b[1])
      .map(([key, value]) => ({ key, value }));
  }, [breakpoints]);

  const [breakpoint, setBreakpoint] = useState(searchBreakpoint(entries));

  useEffect(() => {
    const onResize = () => {
      setBreakpoint(searchBreakpoint(entries));
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [entries, searchBreakpoint]);

  return breakpoint;
};

export { useBreakpoints };
