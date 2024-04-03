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
  const activePath = pathname.split("/")[1];

  const [isDomLoaded, setIsDomLoaded] = useState(false);

  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(max-width: 1023px)");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleLearnChange = useCallback(
    (value: string) => {
      router.push("learn?" + createQueryString("l", value));
    },
    [router, createQueryString],
  );

  const handleRouteChange = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  useEffect(() => {
    if (activePath == "learn" && search == "") {
      router.push("learn?" + createQueryString("l", "alpha"));
    }
    setIsDomLoaded(true);
  }, [activePath, search, router, createQueryString]);

  if (!isDomLoaded) return <></>;

  if (isMobile) {
    return (
      <div className="fixed bottom-0 z-50 w-screen border-t-2 border-border bg-background">
        <nav className="bg-foreground/[0.04]">
          <div className="flex items-center justify-center gap-4 px-6 py-3">
            <ProfileTile
              isSelected={activePath === "profile"}
              onPress={() => router.push("/profile")}
            />
            <CharacterTile
              iconCharacters="Ab"
              label="Alphabets"
              isSelected={search == "alpha"}
              onPress={() => handleLearnChange("alpha")}
            />
            <CharacterTile
              iconCharacters="12"
              label="Numbers"
              isSelected={search == "num"}
              onPress={() => handleLearnChange("num")}
            />
            <MoreActionsTile />
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="fixed h-screen min-h-fit w-[80px] max-w-[260px] border-r-2 border-border bg-background lg:w-full">
      <nav className="h-full bg-foreground/[0.015]">
        <div className="flex h-full flex-col justify-between">
          <Title />
          <div className="flex flex-col items-center gap-4 p-5">
            <CharacterTile
              iconCharacters={isTablet ? "Ab" : "Abc"}
              label="Alphabets"
              isSelected={activePath == "learn" && search == "alpha"}
              onPress={() => handleLearnChange("alpha")}
            />
            <CharacterTile
              iconCharacters={isTablet ? "12" : "123"}
              label="Numbers"
              isSelected={activePath == "learn" && search == "num"}
              onPress={() => handleLearnChange("num")}
            />
            <ProfileTile
              isSelected={activePath === "profile"}
              onPress={() => handleRouteChange("/profile")}
            />
            <MoreActionsTile />
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-3 border-t-2 border-border px-4 py-5 lg:flex-row">
            <ThemeSwitch />
          </div>
        </div>
      </nav>
    </div>
  );
};
