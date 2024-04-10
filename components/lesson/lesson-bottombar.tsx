import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Check, X } from "lucide-react";
import { randomCorrectMessage, randomIncorrectMessage } from "@/utils/random";
import clsx from "clsx";
import { Result, ResultType, LessonStatus } from "@/types";

export enum PrimaryButtonType {
  Check = "Check",
  Continue = "Continue",
}

interface LessonBottombarProps {
  state: LessonStatus;
  result?: Result;
  showSecondaryButton?: boolean;
  onSecondaryClick?: () => void;
  isPrimaryDisabled: boolean;
  onPrimaryClick: () => void;
}

const LessonBottombar = (props: LessonBottombarProps) => {
  const {
    state,
    result,
    showSecondaryButton = true,
    onSecondaryClick = () => {},
    isPrimaryDisabled,
    onPrimaryClick,
  } = props;

  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const [resultMessage, setResultMessage] = useState<string>("Loading");

  useEffect(() => {
    if (state === LessonStatus.Result) {
      setResultMessage(
        result?.type === ResultType.Correct
          ? randomCorrectMessage()
          : randomIncorrectMessage(),
      );
    }
    setIsDomLoaded(true);
  }, [state, result]);

  if (!isDomLoaded)
    return (
      <div className="fixed bottom-0 z-40 h-20 w-full border-t border-border bg-background md:h-32">
        <div className="h-full w-full bg-foreground/[0.04] dark:bg-foreground/[0.015]" />
      </div>
    );

  return (
    <div
      className={
        "fixed bottom-0 z-40 h-fit min-h-[4rem] w-full border-t border-border bg-background md:h-32"
      }
    >
      <div
        className={clsx(
          "h-full w-full bg-foreground/[0.04] dark:bg-foreground/[0.015]",
          {
            "bg-primary-500/10 dark:bg-primary-200/5":
              state == LessonStatus.Result &&
              result?.type === ResultType.Correct,
          },
          {
            "bg-danger-500/[0.15] dark:bg-danger-200/[0.06]":
              state == LessonStatus.Result &&
              result?.type === ResultType.Incorrect,
          },
        )}
      >
        <div className="mx-auto flex h-full max-w-5xl flex-col justify-between gap-4 px-6 py-4 md:flex-row md:items-center">
          {(() => {
            switch (state) {
              case LessonStatus.Result:
                return (
                  <div className="flex items-center gap-4">
                    <div
                      className={
                        "hidden h-12 w-12 place-content-center rounded-3xl bg-foreground/[0.05] min-[450px]:grid md:h-16 md:w-16"
                      }
                    >
                      {result?.type === ResultType.Incorrect ? (
                        <X
                          strokeWidth={5}
                          className="text-danger-500 md:h-8 md:w-8"
                        />
                      ) : (
                        <Check
                          strokeWidth={6}
                          className="text-primary-500 md:h-8 md:w-8"
                        />
                      )}
                    </div>
                    <div>
                      {result?.type === ResultType.Incorrect ? (
                        <div className="flex flex-col text-danger-500">
                          <span className="text-xl font-semibold tracking-wider md:text-2xl">
                            {resultMessage}
                          </span>
                          <span className="text-base text-foreground">
                            The right answer is{" "}
                            <span className="font-semibold text-warning md:text-xl">
                              &lsquo;{result?.answer}&rsquo;
                            </span>
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col text-primary">
                          <span className="text-xl font-semibold tracking-wider md:text-2xl">
                            {resultMessage}
                          </span>
                          <span className="flex text-base text-foreground">
                            You&apos;re on fire with your answers!
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              case LessonStatus.Question:
                return showSecondaryButton ? (
                  <SecondaryButton label="Skip" onPress={onSecondaryClick} />
                ) : (
                  <></>
                );
              case LessonStatus.Complete:
                return showSecondaryButton ? (
                  <SecondaryButton
                    label="Review Lesson"
                    onPress={onSecondaryClick}
                  />
                ) : (
                  <></>
                );
              default:
                return <></>;
            }
          })()}

          <PrimaryButton
            resultType={
              state == LessonStatus.Result
                ? result?.type ?? ResultType.Correct
                : ResultType.Correct
            }
            isDisabled={isPrimaryDisabled}
            label={
              LessonStatus.Complete
                ? PrimaryButtonType.Continue
                : PrimaryButtonType.Check
            }
            onPress={onPrimaryClick}
          />
        </div>
      </div>
    </div>
  );
};

export default LessonBottombar;

const SecondaryButton = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => {
  return (
    <Button
      color="default"
      variant="bordered"
      onPress={onPress}
      size="lg"
      className="hidden w-full tracking-wide md:block md:max-w-[150px]"
    >
      {label}
    </Button>
  );
};

const PrimaryButton = ({
  isDisabled,
  resultType,
  label,
  onPress,
}: {
  isDisabled: boolean;
  resultType: ResultType;
  label: string;
  onPress: () => void;
}) => {
  return (
    <Button
      color={resultType === ResultType.Incorrect ? "danger" : "primary"}
      variant="solid"
      isDisabled={isDisabled}
      onPress={onPress}
      size="lg"
      className="letter w-full font-medium tracking-wider dark:font-semibold md:max-w-[180px]"
    >
      {label}
    </Button>
  );
};
