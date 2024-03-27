"use client";
import { useState, useEffect, useCallback } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Title from "./navbar/title";
import CharacterTile from "./navbar/character";
import ProfileTile from "./navbar/profile";
import MoreActionsTile from "./navbar/more-actions";
import ThemeSwitch from "./navbar/theme-switch";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("l") || "";

  const [isDomLoaded, setIsDomLoaded] = useState(false);

  const isMobile = useMediaQuery("(max-width: 625px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleLessonChange = useCallback(
    (value: string) => {
      router.push(pathname + "?" + createQueryString("l", value));
    },
    [router, pathname, createQueryString]
  );

  useEffect(() => {
    if (search == "") {
      router.push(pathname + "?" + createQueryString("l", "alpha"));
    }
    setIsDomLoaded(true);
  }, [search, router, pathname, createQueryString]);

  if (!isDomLoaded) return <></>;
  if (isMobile) {
    return (
      <nav className="z-50 w-screen fixed border-t-2 border-border bottom-0 bg-background">
        <div className="flex justify-center gap-4 items-center py-4 px-6">
          <ProfileTile />
          <CharacterTile
            iconCharacters="Ab"
            label="Alphabets"
            isSelected={search == "alpha"}
            onPress={() => handleLessonChange("alpha")}
          />
          <CharacterTile
            iconCharacters="12"
            label="Numbers"
            isSelected={search == "num"}
            onPress={() => handleLessonChange("num")}
          />
          <MoreActionsTile />
        </div>
      </nav>
    );
  }
  if (isTablet)
    return (
      <nav className="w-[80px] h-screen fixed border-r-2 border-border bg-background">
        <div className="flex flex-col h-full justify-between p-4 pb-5">
          <Title />
          <div className="flex flex-col gap-4 items-center">
            <CharacterTile
              iconCharacters="Ab"
              label="Alphabets"
              isSelected={search == "alpha"}
              onPress={() => handleLessonChange("alpha")}
            />
            <CharacterTile
              iconCharacters="12"
              label="Numbers"
              isSelected={search == "num"}
              onPress={() => handleLessonChange("num")}
            />
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-3 justify-between items-center">
            <div className="order-2">
              <ThemeSwitch />
            </div>
            <div className="order-1">
              <ProfileTile />
            </div>
            <div className="order-3">
              <MoreActionsTile />
            </div>
          </div>
        </div>
      </nav>
    );
  return (
    <nav className="min-w-[250px] w-full max-w-[280px] h-screen fixed border-r-2 border-border bg-background">
      <div className="flex flex-col h-full justify-between p-4 pb-5">
        <Title />
        <div className="flex flex-col gap-4 px-4 items-center">
          <CharacterTile
            iconCharacters="Ab"
            label="Alphabets"
            isSelected={search == "alpha"}
            onPress={() => handleLessonChange("alpha")}
          />
          <CharacterTile
            iconCharacters="12"
            label="Numbers"
            isSelected={search == "num"}
            onPress={() => handleLessonChange("num")}
          />
        </div>
        <div className="flex flex-col lg:flex-row w-full gap-3 justify-between items-center">
          <ThemeSwitch />
          <ProfileTile />
          <MoreActionsTile />
        </div>
      </div>
    </nav>
  );
};

// primary: #1AE61B
// primary-foreground: #072904
// secondary: #1AE6E2
// secondary-foreground: #052E2D
