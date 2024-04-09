import React, { forwardRef } from "react";
import clsx from "clsx";
import CharacterSvg from "@/components/learn/characters-svg";
import { useButton, ButtonProps } from "@nextui-org/button";
import { Ripple } from "@nextui-org/ripple";
import { ClassNameProp } from "@/types";
import { ResultType } from "../lesson-bottombar";

interface CustomSignButtonProps extends ButtonProps {
  isSelected: boolean;
  result?: ResultType;
}

export const CustomSignButton = forwardRef<
  HTMLButtonElement,
  CustomSignButtonProps
>((props, ref) => {
  const {
    domRef,
    children,
    disableRipple,
    getButtonProps,
    startContent,
    endContent,
    getRippleProps,
  } = useButton({
    ref,
    ...props,
  });
  const { isSelected, result, onClick } = props as CustomSignButtonProps;
  const { ripples, onClear } = getRippleProps();

  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative z-0 flex flex-col items-end overflow-hidden rounded-xl border-3 p-4 outline-none transition-colors dark:border-2",
        !isSelected
          ? "border-default text-foreground-500 hover:bg-foreground-100 dark:hover:bg-foreground-50/80"
          : result == undefined
            ? "border-secondary-500 bg-secondary-100 text-secondary-500 dark:bg-secondary-400/5"
            : result === ResultType.Correct
              ? "border-primary-500 bg-primary-100 text-primary-500 dark:bg-primary-400/5"
              : "border-danger-500 bg-danger-100 text-danger-500 dark:bg-danger-400/5",
      )}
      style={{
        WebkitTapHighlightColor: "transparent",
      }}
      ref={domRef}
      {...getButtonProps()}
    >
      {children}
      {endContent}
      {!disableRipple && <Ripple ripples={ripples} onClear={onClear} />}
    </button>
  );
});

CustomSignButton.displayName = "CustomSignButton";

const IndexIndicator = ({ index }: { index: number }) => {
  return (
    <span className="rounded-md border-2 border-inherit px-2 text-center">
      {index + 1}
    </span>
  );
};

IndexIndicator.displayName = "IndexIndicator";

export interface SignOptionProps extends ClassNameProp {
  character: string;
  result?: ResultType;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export const SignOption = ({
  index,
  character,
  result,
  isSelected,
  onClick,
  className,
}: SignOptionProps) => {
  return (
    <CustomSignButton
      color={
        !isSelected
          ? "default"
          : result == undefined
            ? "secondary"
            : result === ResultType.Correct
              ? "success"
              : "danger"
      }
      variant="bordered"
      disableRipple={true}
      endContent={<IndexIndicator index={index} />}
      onClick={onClick}
      isSelected={isSelected}
      result={result}
    >
      <CharacterSvg character={character} />
    </CustomSignButton>
  );
};

SignOption.displayName = "SignOption";
