"use client";
import { useEffect, useState } from "react";
import CharacterCard from "./character-card";
import { useSearchParams } from "next/navigation";

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
      <div className="flex flex-col items-center justify-center gap-4 py-8 pb-28 sm:ml-[80px] md:h-screen md:py-10 md:pb-0 lg:ml-[260px]">
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
    <div className="flex flex-col items-center justify-center gap-4 py-8 pb-28 sm:ml-[80px] md:h-screen md:py-10 md:pb-0 lg:ml-[260px]">
      <div className="flex w-full max-w-[44rem] flex-wrap justify-center gap-4 px-6 ">
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
