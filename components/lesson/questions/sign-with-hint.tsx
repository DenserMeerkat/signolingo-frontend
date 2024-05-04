import { CharacterQuestion, CharacterType } from "@/types";
import clsx from "clsx";
import SignCapture from "./sign-capture";
import CharacterClip from "./character-clip";
import { useEffect } from "react";
import { getPrediction } from "@/lib/request";

interface SignWithHintProps extends CharacterQuestion {
  triggerAnswerSubmission: (value: string) => void;
}

const SignWithHint = (props: SignWithHintProps) => {
  const {
    character,
    options,
    resultType,
    type,
    value,
    onValueChange,
    triggerAnswerSubmission,
  } = props;

  useEffect(() => {
    setTimeout(() => {
      if (onValueChange && value !== character) {
        onValueChange(character);
      }
    }, 10000);
  }, [character]);

  return (
    <div
      className={clsx("min-h-96 mx-auto h-fit max-w-4xl px-4 pb-32 pt-12", {
        "pointer-events-none": resultType != undefined,
      })}
    >
      <div className="mx-auto mt-3 flex flex-col gap-3 px-4 sm:mt-3 md:gap-6">
        <span className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">
          Sign the character
        </span>
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="flex flex-col gap-4">
            <div className="hidden sm:block">
              <CharacterClip
                character={character}
                size="sm"
                className="rounded-xl border-2 border-background/20"
              />
            </div>

            <span className="text-center text-4xl font-semibold sm:text-6xl">
              {character}
            </span>
          </div>
          <div className="relative w-full">
            <div className="absolute z-10 m-2 sm:hidden">
              <CharacterClip
                character={character}
                size="sm"
                className="rounded-xl border-2 border-background/20"
              />
            </div>
            <SignCapture
              onFrame={async (data) => {
                if (onValueChange && value !== character) {
                  const prediction = await getPrediction(type, data, true);
                  if (prediction === character) {
                    onValueChange(prediction);
                    triggerAnswerSubmission(prediction);
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignWithHint;
