import React, { forwardRef } from "react";
import clsx from "clsx";
import CharacterSvg from "@/components/learn/characters-svg";
import { useButton, ButtonProps } from "@nextui-org/button";
import { Ripple } from "@nextui-org/ripple";
import { ClassNameProp, ResultType } from "@/types";

interface CustomSignButtonProps extends ButtonProps {
  isSelected: boolean;
  resultType?: ResultType;
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
  const { isSelected, resultType, onClick } = props as CustomSignButtonProps;
  const { ripples, onClear } = getRippleProps();

  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative z-0 flex flex-col items-end overflow-hidden rounded-xl border-3 p-4 outline-none transition-colors dark:border-2",
        !isSelected
          ? "border-default text-foreground-500 hover:bg-foreground-100 dark:hover:bg-foreground-50/80"
          : resultType == undefined
            ? "border-secondary-500 bg-secondary-100 text-secondary-500 dark:bg-secondary-400/5"
            : resultType === ResultType.Correct
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
  resultType?: ResultType;
  isSelected: boolean;
  onClick: () => void;
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
    <CustomSignButton
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
      onClick={onClick}
      isSelected={isSelected}
      resultType={resultType}
    >
      <CharacterSvg character={character} />
    </CustomSignButton>
  );
};

SignOption.displayName = "SignOption";
