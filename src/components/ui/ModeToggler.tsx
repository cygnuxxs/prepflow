"use client";

import * as React from "react";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { useTheme } from "next-themes";
import { useKeyPress } from "@/hooks/use-keypress";

import { Button } from "@/components/ui/button";

// 1. Extract shared transition to avoid repeating it 10 times
const SHARED_TRANSITION = { duration: 0.5, ease: "easeInOut" } as const;

// 2. Map out the sun rays with their specific animation coordinates
const SUN_RAYS = [
  { d: "M12 2v2", initial: { y: -10, rotate: 0 }, dark: { y: -10, rotate: -45 } },
  { d: "M12 20v2", initial: { y: 10, rotate: 0 }, dark: { y: 10, rotate: 45 } },
  { d: "m4.93 4.93 1.41 1.41", initial: { x: -10, rotate: 0 }, dark: { x: -10, rotate: -45 } },
  { d: "m17.66 17.66 1.41 1.41", initial: { x: 10, rotate: 0 }, dark: { x: 10, rotate: 45 } },
  { d: "M2 12h2", initial: { x: -10, rotate: 0 }, dark: { x: -10, rotate: -45 } },
  { d: "M20 12h2", initial: { x: 10, rotate: 0 }, dark: { x: 10, rotate: 45 } },
  { d: "m6.34 17.66-1.41 1.41", initial: { rotate: -90 }, dark: { rotate: -90 } },
  { d: "m19.07 4.93-1.41 1.41", initial: { rotate: 90 }, dark: { rotate: 90 } },
];

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const isLight = resolvedTheme === "light";

  // 3. Memoize the toggle function
  const toggleTheme = React.useCallback(() => {
    setTheme(isLight ? "dark" : "light");
  }, [isLight, setTheme]);

  useKeyPress("d", (e: KeyboardEvent) => {
    // 4. Input safety check: Don't toggle if typing inside a form field or editor (e.g. Monaco uses contenteditable divs)
    const target = e.target as HTMLElement;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable
    ) return;

    e.preventDefault();
    toggleTheme();
  });

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    // 5. Prevent layout shift by rendering an invisible skeleton button instead of null
    return <Button variant="ghost" size="icon" className="invisible size-10" aria-hidden="true" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="[&_svg]:shrink [&_svg]:size-5 hover:border hover:bg-background transition-all"
      onClick={toggleTheme}
      aria-label="Change Light/Dark Mode"
    >
      <LazyMotion features={domAnimation}>
      <m.svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.6))" }}
        // 6. Use Framer Motion 'animate' at the parent level to cascade variants
        animate={isLight ? "light" : "dark"}
      >
        {/* Moon Path */}
        <m.path
          initial={{ rotate: 0, scale: 1, opacity: 0 }}
          variants={{
            light: { rotate: 90, scale: 0, opacity: 0, stroke: "#6b7280" },
            dark: { rotate: 0, scale: 1, opacity: 1, stroke: "#6b7280", fill: "#6b7280" },
          }}
          transition={SHARED_TRANSITION}
          d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
        />

        {/* Sun Circle */}
        <m.circle
          initial={{ scale: 0.95, opacity: 0 }}
          variants={{
            light: { scale: 1, opacity: 1, stroke: "#f59e0b" },
            dark: { scale: 0.95, opacity: 0, stroke: "#6b7280" },
          }}
          transition={SHARED_TRANSITION}
          cx="12"
          cy="12"
          r="4"
        />

        {/* Sun Rays */}
        {SUN_RAYS.map((ray) => (
          <m.path
            key={ray.d}
            initial={{ opacity: 0, ...ray.initial }}
            variants={{
              light: { opacity: 1, x: 0, y: 0, rotate: 0, stroke: "#f59e0b" },
              dark: { opacity: 0, stroke: "#6b7280", ...ray.dark },
            }}
            transition={SHARED_TRANSITION}
            d={ray.d}
          />
        ))}
      </m.svg>
      </LazyMotion>
    </Button>
  );
}