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
    <Button
      isIconOnly
      variant={isMobile ? "light" : "flat"}
      onClick={onChange}
      radius="lg"
      className={clsx(
        "h-14 w-14 sm:h-12 sm:w-12 sm:dark:border-zinc-800 sm:dark:bg-zinc-900 lg:h-10",
        className,
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
