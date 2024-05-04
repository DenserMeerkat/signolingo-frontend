import CharacterSvg from "@/components/learn/characters-svg";
import { ClassNameProp, ResultType, OptionType } from "@/types";
import { CustomButton, IndexIndicator } from "./option";

export interface SignOptionProps extends ClassNameProp {
  character: string;
  resultType?: ResultType;
  isSelected: boolean;
  onClick: (index: number) => void;
  index: number;
}

export const SignOption = ({
  index,
  character,
  resultType,
  isSelected,
  onClick,
  className,
}: SignOptionProps) => {
  return (
    <CustomButton
      optionType={OptionType.Sign}
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
      endContent={<IndexIndicator index={index} />}
      onClick={() => onClick(index)}
      isSelected={isSelected}
      resultType={resultType}
    >
      <CharacterSvg character={character} />
    </CustomButton>
  );
};

SignOption.displayName = "SignOption";
