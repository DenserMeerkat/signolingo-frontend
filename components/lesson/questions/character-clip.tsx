import { cn } from "@/lib/utils";
import { ClassNameProp } from "@/types";
import React from "react";

interface CharacterClipProps extends ClassNameProp {
  character: string;
  size: "xs" | "sm" | "md" | "lg";
}

const CharacterClip = ({ className, character, size }: CharacterClipProps) => {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-2xl border-2 border-foreground/20 ",
        className,
        {
          "h-[280px] w-[280px]  sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[380px] lg:w-[380px]":
            size == "lg",
        },
        {
          "h-[150px] w-[150px]  sm:h-[180px] sm:w-[180px] md:h-[200px] md:w-[200px] lg:h-[240px] lg:w-[240px]":
            size == "md",
        },
        {
          "h-[100px] w-[100px]  md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px]":
            size == "sm",
        },
        {
          "h-[80px] w-[80px]  sm:h-[120px] sm:w-[120px]": size == "xs",
        },
      )}
    >
      <video
        src={`clips/${character}.webm`}
        className="h-full w-full scale-110 -scale-x-100 object-cover"
        autoPlay
        muted
        loop
      ></video>
    </div>
  );
};

export default CharacterClip;
