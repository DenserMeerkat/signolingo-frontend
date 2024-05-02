import React, { useState, useEffect } from "react";
import { CharacterQuestion } from "@/types";
import clsx from "clsx";
import { Progress } from "@nextui-org/progress";

const Introduction = (porps: CharacterQuestion) => {
  const [timer, setTimer] = useState(0);
  const { character, options, resultType, type, value, onValueChange } = porps;

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1);

    const timeoutId = setTimeout(() => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (onValueChange) onValueChange(character);
    }, 2001);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      clearTimeout(timeoutId);
    };
  });

  return (
    <div
      key={character}
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
        </div>

        <div className="relative aspect-square h-[280px] w-[280px] overflow-hidden rounded-2xl border-2 border-foreground/20  sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[380px] lg:w-[380px]">
          <video
            src={`clips/${character}.mp4`}
            className="h-full w-full scale-110 object-cover"
            autoPlay
            muted
            loop
          ></video>
          <Progress
            color={"warning"}
            aria-label="Loading..."
            value={timer}
            maxValue={2000}
            className={
              "absolute bottom-0 z-10 h-1.5 w-full px-2 sm:h-2 md:h-2.5"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
