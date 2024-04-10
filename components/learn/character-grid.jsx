"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CharacterCard from "./character-card";
import LearnCharacter from "./learn-character";
import { CharacterType } from "@/types";

const CharacterGrid = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("c") || CharacterType.Alphabets;

  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const arr = [0, 100, 23, 45, 89];

  useEffect(() => {
    setIsDomLoaded(true);
  }, [isDomLoaded]);

  if (!isDomLoaded) return <></>;

  if (search === CharacterType.Alphabets) {
    return (
      <div className="flex h-fit flex-col items-center justify-center gap-4 py-6 pb-28 sm:ml-[80px] md:py-8 lg:ml-[260px]">
        <LearnCharacter
          heading="Let's learn Alphabets"
          subtitle="Learn your ABCs in American Sign Language"
          cta="Learn Alphabets"
          characterType={CharacterType.Alphabets}
        />
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
      <LearnCharacter
        heading="Let's learn Numbers"
        subtitle="Start counting in American Sign Language"
        cta="Learn Numbers"
        characterType={CharacterType.Numbers}
      />
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
