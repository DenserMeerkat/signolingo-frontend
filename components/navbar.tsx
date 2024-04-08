"use client";
import { useState, useEffect, useCallback } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Title from "./navbar/title";
import CharacterTile from "./navbar/character";
import ProfileTile from "./navbar/profile";
import MoreActionsTile from "./navbar/more-actions";
import { CharacterType } from "@/types";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("c") || "";
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

  useEffect(() => {
    if (activePath == "learn" && search == "") {
      router.push("learn?" + createQueryString("c", CharacterType.alphabets));
    }
    setIsDomLoaded(true);
  }, [activePath, search, router, createQueryString]);

  if (!isDomLoaded || activePath == "lesson") return <></>;

  if (isMobile) {
    return (
      <div className="fixed bottom-0 z-50 w-screen border-t-2 border-border bg-background">
        <nav className="bg-foreground/[0.04]">
          <div className="flex items-center justify-center gap-4 px-6 py-3">
            <ProfileTile
              isSelected={activePath === "profile"}
              href="/profile"
            />
            <CharacterTile
              iconCharacters="Ab"
              label="Alphabets"
              isSelected={search == CharacterType.alphabets}
              href={"/learn?" + createQueryString("c", CharacterType.alphabets)}
            />
            <CharacterTile
              iconCharacters="12"
              label="Numbers"
              isSelected={search == CharacterType.numbers}
              href={"/learn?" + createQueryString("c", CharacterType.numbers)}
            />
            <MoreActionsTile />
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="fixed h-screen min-h-fit w-[80px] max-w-[260px] overflow-y-auto border-r-2 border-border bg-background lg:w-full">
      <nav className="h-full bg-foreground/[0.015]">
        <div className="flex h-full flex-col justify-between">
          <Title />
          <div className="flex flex-col items-center gap-4 p-5">
            <CharacterTile
              iconCharacters={isTablet ? "Ab" : "Abc"}
              label="Alphabets"
              isSelected={
                activePath == "learn" && search == CharacterType.alphabets
              }
              href={"/learn?" + createQueryString("c", CharacterType.alphabets)}
            />
            <CharacterTile
              iconCharacters={isTablet ? "12" : "123"}
              label="Numbers"
              isSelected={
                activePath == "learn" && search == CharacterType.numbers
              }
              href={"/learn?" + createQueryString("c", CharacterType.numbers)}
            />
            <ProfileTile
              isSelected={activePath === "profile"}
              href="/profile"
            />
            <MoreActionsTile />
          </div>
          <div></div>
          <div></div>
        </div>
      </nav>
    </div>
  );
};
