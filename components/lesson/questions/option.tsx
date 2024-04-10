import React, { forwardRef } from "react";
import clsx from "clsx";
import { useButton, ButtonProps } from "@nextui-org/button";
import { Ripple } from "@nextui-org/ripple";
import { OptionType, ResultType } from "@/types";

interface CustomButtonProps extends ButtonProps {
  isSelected: boolean;
  resultType?: ResultType;
  optionType: OptionType;
}

export const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (props, ref) => {
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
    const { isSelected, resultType, onClick, optionType } =
      props as CustomButtonProps;
    const { ripples, onClear } = getRippleProps();

    return (
      <button
        onClick={onClick}
        className={clsx(
          "relative flex overflow-hidden rounded-xl border-3 p-4 outline-none transition-colors dark:border-2",
          optionType == OptionType.Character
            ? "w-full items-center justify-between"
            : "flex flex-col items-end space-y-2",
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
        {startContent}
        {children}
        {endContent}
        {!disableRipple && <Ripple ripples={ripples} onClear={onClear} />}
      </button>
    );
  },
);

CustomButton.displayName = "CustomButton";

export const IndexIndicator = ({ index }: { index: number }) => {
  return (
    <span className="rounded-md border-2 border-inherit px-2 text-center text-xs sm:text-sm md:text-base">
      {index + 1}
    </span>
  );
};

IndexIndicator.displayName = "IndexIndicator";
