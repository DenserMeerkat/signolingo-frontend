"use client";
import { useEffect, useState } from "react";
import CharacterCard from "./character-card";
import { useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";

const CharacterGrid = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("l") || "alpha";

  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const arr = [0, 100, 23, 45, 89];

  useEffect(() => {
    setIsDomLoaded(true);
  }, [isDomLoaded]);

  if (!isDomLoaded) return <></>;

  if (search === "alpha") {
    return (
      <div className="flex h-fit flex-col items-center justify-center gap-4 py-6 pb-28 sm:ml-[80px] md:py-8 lg:ml-[260px]">
        <div className="sticky top-0 z-10 flex w-full flex-col items-center gap-3 bg-gradient-to-b from-background from-50% via-background/80 via-[90%] pb-12 pt-4">
          <h2 className="text-2xl font-semibold tracking-wide sm:text-3xl">
            Let&apos;s learn alphabets
          </h2>
          <span className="mb-4 text-sm tracking-wide sm:text-base">
            Learn your ABCs in American Sign Language
          </span>
          <Button color="warning" variant="flat" onClick={() => {}} size="lg">
            <span className="font-semibold tracking-widest sm:text-lg">
              Learn Alphabets
            </span>
          </Button>
        </div>
        <div className="flex w-full max-w-[44rem] flex-wrap justify-center gap-4 px-6">
          {Array.from({ length: 26 }).map((_, index) => (
            <CharacterCard
              key={index}
              character={String.fromCharCode(65 + index)}
              progress={arr[Math.floor(Math.random() * arr.length)]}
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-fit flex-col items-center justify-center gap-4 py-6 pb-28 sm:ml-[80px] md:py-8 lg:ml-[260px]">
      <div className="sticky top-0 z-10 flex w-full flex-col items-center gap-3 bg-gradient-to-b from-background from-50% via-background/80 via-[90%] pb-12 pt-4">
        <h2 className="text-2xl font-semibold tracking-wide md:text-3xl">
          Let&apos;s learn Numbers
        </h2>
        <span className="mb-4 text-sm tracking-wide sm:text-base">
          Start counting in American Sign Language
        </span>
        <Button color="warning" variant="flat" onClick={() => {}} size="lg">
          <span className="font-semibold tracking-widest sm:text-lg">
            Learn Numbers
          </span>
        </Button>
      </div>

      <div className="flex w-full max-w-[44rem] flex-wrap justify-center gap-4 px-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <CharacterCard
            key={index}
            character={index.toString()}
            progress={arr[Math.floor(Math.random() * arr.length)]}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterGrid;
