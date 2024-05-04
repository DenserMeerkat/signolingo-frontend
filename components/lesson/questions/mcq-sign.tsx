import { SignOption } from "./sign-option";
import { CharacterQuestion } from "@/types";
import clsx from "clsx";

const MCQSign = (props: CharacterQuestion) => {
  const { character, options, resultType, type, value, onValueChange } = props;

  const handleToggle = (index: number) => {
    onValueChange!(options![index]);
  };

  return (
    <div
      className={clsx("min-h-96 mx-auto h-fit max-w-2xl px-4 pb-32 pt-10", {
        "pointer-events-none": resultType != undefined,
      })}
    >
      <div className="mx-auto mt-3 flex max-w-2xl flex-col gap-3 px-4 sm:mt-4 md:mt-6 md:gap-8">
        <span className="text-center text-xl font-semibold md:text-2xl">
          Find the sign for the character shown below
        </span>
        <span className="text-center text-4xl font-semibold md:text-5xl">
          {character}
        </span>

        <div className="mx-auto mt-3 grid w-full max-w-[240px] grid-cols-2 gap-4 sm:mt-8 sm:max-w-none sm:grid-cols-4">
          {options!.map((option: string, index: number) => (
            <SignOption
              key={index}
              index={index}
              character={option}
              isSelected={value === option}
              resultType={resultType}
              onClick={handleToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MCQSign;
