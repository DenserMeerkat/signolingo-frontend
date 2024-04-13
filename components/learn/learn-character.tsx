import { useCallback } from "react";
import { Button } from "@nextui-org/button";
import { CharacterType } from "@/types";
import { useSearchParams } from "next/navigation";
import { Link } from "@nextui-org/link";

export interface LearnCharacterProps {
  heading: string;
  subtitle: string;
  cta: string;
  characterType: CharacterType;
}

const LearnCharacter = (props: LearnCharacterProps) => {
  const params = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const newParams = new URLSearchParams(params.toString());
      newParams.set(name, value);

      return newParams.toString();
    },
    [params],
  );

  return (
    <div className="sticky top-0 z-10 flex w-full flex-col items-center gap-3 bg-gradient-to-b from-background from-50% via-background/80 via-[90%] pb-12 pt-4">
      <h2 className="text-2xl font-semibold tracking-wide sm:text-3xl">
        {props.heading}
      </h2>
      <span className="mb-4 text-center text-sm tracking-wide sm:text-base">
        {props.subtitle}
      </span>
      <Button
        href={"lesson?" + createQueryString("c", props.characterType)}
        as={Link}
        color="warning"
        variant="flat"
        size="lg"
        className="backdrop-blur-md"
      >
        <span className="font-semibold tracking-widest sm:text-lg">
          {props.cta}
        </span>
      </Button>
    </div>
  );
};

export default LearnCharacter;
