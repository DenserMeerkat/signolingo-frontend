import React, { useState, useEffect } from "react";
import { CharacterQuestion, ClassNameProp } from "@/types";
import clsx from "clsx";
import { CircularProgress } from "@nextui-org/progress";
import { cn } from "@/lib/utils";
import CharacterClip from "./character-clip";

const Introduction = (props: CharacterQuestion) => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const [timer, setTimer] = useState(0);
  const { character, options, resultType, type, value, onValueChange } = props;

  useEffect(() => {
    setIsDomLoaded(true);
    const interval = setInterval(() => {
      if (timer == 2500 && onValueChange) {
        onValueChange(character);
        clearInterval(interval);
      } else {
        setTimer((prev) => prev + 4);
      }
    }, 2);

    return () => {
      clearInterval(interval);
    };
  }, [timer, character]);

  if (!isDomLoaded) return <></>;

  return (
    <div
      className={clsx("min-h-96 mx-auto h-fit max-w-3xl px-4 pb-32 pt-10", {
        "pointer-events-none": resultType != undefined,
      })}
    >
      <div className="mt-3 flex flex-col items-center justify-center gap-4 sm:mt-4 sm:flex-row md:mt-6">
        <div className="mx-auto mt-3 flex max-w-2xl flex-col gap-3 px-4 sm:mt-4 sm:self-start md:mt-6 md:gap-8">
          <span className="text-center text-xl font-semibold md:text-2xl">
            Let&apos;s learn a new character
          </span>
          <span className="text-center text-4xl font-semibold sm:text-9xl">
            {character}
          </span>
          <PracticeTimer
            timer={timer}
            className="mt-6 hidden sm:flex lg:mt-14"
          />
        </div>

        <CharacterClip character={character} size="lg" />
        <PracticeTimer timer={timer} className="mt-6 flex sm:hidden" />
      </div>
    </div>
  );
};

export default Introduction;

interface PracticeTimerProps extends ClassNameProp {
  timer: number;
}

const PracticeTimer = (props: PracticeTimerProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3",
        props.className,
        props.timer >= 2500 ? "text-primary" : "text-warning",
      )}
    >
      <CircularProgress
        color={props.timer >= 2500 ? "primary" : "warning"}
        aria-label="Loading..."
        value={props.timer}
        maxValue={2500}
        strokeWidth={3.6}
        classNames={{
          svg: "h-12 w-12 md:w-14 md:h-14 drop-shadow-md",
        }}
      />
      <div className="flex flex-col">
        <span className="text-xl font-semibold md:text-2xl">Practice</span>
        <span className="text-sm font-medium text-foreground md:text-base">
          Sign the character yourself
        </span>
      </div>
    </div>
  );
};
