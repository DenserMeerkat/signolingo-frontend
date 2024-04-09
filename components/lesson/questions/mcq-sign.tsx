import { useState } from "react";
import { SignOption } from "./sign-option";

const MCQSign = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const options = ["A", "B", "C", "D"];
  const question = "A";
  const result = undefined;

  const handleToggle = (index: number) => {
    setSelected(index);
  };

  return (
    <div className="min-h-96 mx-auto h-full max-w-2xl px-4 pb-40 pt-12">
      <div className="flex flex-col gap-3 md:gap-8">
        <span className="text-center text-xl font-semibold">
          Find the sign for the character shown below
        </span>
        <span className="text-center text-4xl font-semibold">{question}</span>

        <div className="mx-auto mt-3 grid w-full max-w-[240px] grid-cols-2 gap-4 sm:mt-8 sm:max-w-none sm:grid-cols-4">
          {options.map((option: string, index: number) => (
            <SignOption
              key={index}
              index={index}
              character={option}
              isSelected={selected === index}
              result={result}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MCQSign;
