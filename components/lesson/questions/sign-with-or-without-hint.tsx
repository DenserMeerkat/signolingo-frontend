import { useCallback, useState } from "react";
import { CharacterQuestion, CharacterType } from "@/types";
import clsx from "clsx";
import SignCapture from "./sign-capture";
import CharacterClip from "./character-clip";
import { useEffect } from "react";
import { getPrediction } from "@/lib/request";

interface SignWithHintProps extends CharacterQuestion {
  triggerAnswerSubmission: (value: string, forceTrue?: boolean) => void;
  showHint: boolean;
}

const SignWithOrWithoutHint = (props: SignWithHintProps) => {
  const {
    character,
    resultType,
    type,
    value,
    onValueChange,
    triggerAnswerSubmission,
    showHint,
  } = props;

  const [timeUp, setTimeUp] = useState(false);
  const [resultLoaded, setResultLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimeUp(true);
    }, 10000);
  });

  const handleFrame = useCallback(
    async (data: (string | null | undefined)[]) => {
      if (resultLoaded) return;
      if (onValueChange && value == null) {
        if (!timeUp) {
          const prediction = await getPrediction(type, data, true);
          if (prediction === character) {
            onValueChange(prediction);
            triggerAnswerSubmission(prediction);
            setResultLoaded(true);
          }
        } else {
          onValueChange("_");
          triggerAnswerSubmission("_", false);
          setResultLoaded(true);
        }
      }
    },
    [
      resultLoaded,
      onValueChange,
      value,
      timeUp,
      type,
      character,
      triggerAnswerSubmission,
      setResultLoaded,
    ],
  );

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
            {showHint && (
              <div className="hidden sm:block">
                <CharacterClip
                  character={character}
                  size="sm"
                  className="rounded-xl"
                />
              </div>
            )}

            <span className="text-center text-4xl font-semibold sm:text-6xl">
              {character}
            </span>
          </div>
          <div className="relative w-full">
            {showHint && (
              <div className="absolute z-10 m-2 sm:hidden">
                <CharacterClip
                  character={character}
                  size="sm"
                  className="rounded-xl border-2 border-background/20"
                />
              </div>
            )}
            <SignCapture onFrame={handleFrame} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignWithOrWithoutHint;
