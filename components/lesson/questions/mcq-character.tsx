import { CharacterQuestion } from "@/types";
import clsx from "clsx";
import { CharacterOption } from "./character-option";
import CharacterSvg from "@/components/learn/characters-svg";

const MCQCharacter = (props: CharacterQuestion) => {
  const { character, options, resultType, type, value, onValueChange } = props;

  const handleToggle = (ind: number) => {
    onValueChange!(options![ind]);
  };

  return (
    <div
      className={clsx("min-h-96 mx-auto h-fit max-w-2xl px-4 pb-32 pt-12", {
        "pointer-events-none": resultType != undefined,
      })}
    >
      <div className="mx-auto mt-3 flex max-w-lg flex-col gap-3 px-4 sm:mt-4 md:mt-6 md:gap-8">
        <span className="text-center text-xl font-semibold md:text-2xl">
          Find the character for the sign shown below
        </span>
        <div className="mt-6 flex w-full flex-col items-center gap-4 sm:flex-row lg:mt-8">
          <div className="w-32 text-foreground-500 sm:w-96">
            <CharacterSvg character={character} className="-scale-x-100" />
          </div>
          <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-1">
            {options!.map((option: string, index: number) => (
              <CharacterOption
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
    </div>
  );
};

export default MCQCharacter;
