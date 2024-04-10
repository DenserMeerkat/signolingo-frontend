import { ClassNameProp, OptionType, ResultType } from "@/types";
import { CustomButton, IndexIndicator } from "./option";

export interface CharacterOptionProps extends ClassNameProp {
  character: string;
  resultType?: ResultType;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export const CharacterOption = ({
  index,
  character,
  resultType,
  isSelected,
  onClick,
  className,
}: CharacterOptionProps) => {
  return (
    <CustomButton
      optionType={OptionType.Character}
      color={
        !isSelected
          ? "default"
          : resultType == undefined
            ? "secondary"
            : resultType === ResultType.Correct
              ? "success"
              : "danger"
      }
      variant="bordered"
      disableRipple={true}
      startContent={<IndexIndicator index={index} />}
      endContent={<div />}
      onClick={onClick}
      isSelected={isSelected}
      resultType={resultType}
    >
      <span className="text-xl font-semibold">{character}</span>
    </CustomButton>
  );
};

CharacterOption.displayName = "CharacterOption";
