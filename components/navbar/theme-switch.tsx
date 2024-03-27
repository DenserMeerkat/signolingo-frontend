"use client";

import { FC } from "react";
import { useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { useMediaQuery } from "@react-hook/media-query";

import { Button } from "@nextui-org/button";

import { SunMedium, MoonStar } from "lucide-react";
import clsx from "clsx";

export interface ThemeSwitchProps {
  className?: string;
}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();
  const isMobile = useMediaQuery("(max-width: 625px)");

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const { isSelected } = useSwitch({
    isSelected: theme === "light" || isSSR,
    "aria-label": `Switch to ${
      theme === "light" || isSSR ? "dark" : "light"
    } mode`,
    onChange,
  });

  return (
    <Button
      isIconOnly
      variant={isMobile ? "light" : "flat"}
      onClick={onChange}
      size={isMobile ? "lg" : "md"}
      radius="lg"
      className={clsx(
        { "dark:border-zinc-800 dark:bg-zinc-900": !isMobile },
        className
      )}
    >
      {!isSelected || isSSR ? (
        <MoonStar className="text-primary" size={22} />
      ) : (
        <SunMedium size={22} />
      )}
    </Button>
  );
};

export default ThemeSwitch;
