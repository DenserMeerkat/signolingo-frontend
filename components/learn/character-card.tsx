"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";
import { CharacterCardProp } from "@/types";
import CharacterSvg from "./characters-svg";
import { useMediaQuery } from "@react-hook/media-query";

const CharacterCard = (props: CharacterCardProp) => {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const { character, progress } = props;

  const getColor = React.useCallback((progress: number) => {
    switch (progress) {
      case 0:
        return "default";
      case 100:
        return "primary";
      default:
        return "secondary";
    }
  }, []);

  return (
    <Button
      isIconOnly
      variant={progress == 0 ? "bordered" : "flat"}
      color={getColor(progress)}
      className="h-[4.2rem] w-16 flex-col gap-1 p-2 sm:h-28 sm:w-24 lg:w-24"
    >
      <div className="flex w-full flex-col items-center text-foreground dark:text-inherit">
        <CharacterSvg character={character} size={isMobile ? 24 : 40} />
        <span className="text-sm font-medium sm:mb-2 md:text-base">
          {character}
        </span>
        <Progress
          color={getColor(progress)}
          aria-label="Loading..."
          value={progress}
          className={"h-1.5 px-2 sm:h-2 md:h-2.5"}
        />
      </div>
    </Button>
  );
};

export default CharacterCard;
