"use client";

import { FC } from "react";
import { Switch, useSwitch } from "@nextui-org/switch";
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
  const isMobile = useMediaQuery("(max-width: 639px)");

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
    <Switch
      isSelected={!isSelected}
      onChange={onChange}
      size="md"
      color="secondary"
      classNames={{
        wrapper: "mr-0",
        thumb: "dark:bg-secondary-foreground",
      }}
    />
  );
};

export default ThemeSwitch;
