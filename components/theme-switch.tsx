"use client";

import { FC } from "react";
import { useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { Button } from "@nextui-org/button";

import { SunMedium, MoonStar } from "lucide-react";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

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
    <Button isIconOnly variant="flat" onClick={onChange}>
      {!isSelected || isSSR ? (
        <MoonStar className="text-primary" size={22} />
      ) : (
        <SunMedium size={22} />
      )}
    </Button>
  );
};
