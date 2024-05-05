import React, { useEffect, useMemo } from "react";
import { useLottie } from "lottie-react";
import completeLesson from "@/public/animations/complete-lesson.json";
import perfectLesson from "@/public/animations/perfect-lesson.json";
import { LessonResult, QuestionCharacter } from "@/types";
import { cn, getLessonResult } from "@/lib/utils";
import { useAppContext } from "@/context/app-context";

interface LessonResultViewProps {
  questions: QuestionCharacter[];
  answers: string[];
  updateLessonResult: (lessonResult: LessonResult) => void;
}

const LessonResultView = ({
  questions,
  answers,
  updateLessonResult,
}: LessonResultViewProps) => {
  const { userData } = useAppContext();
  const completeOptions = {
    animationData: completeLesson,
    loop: false,
  };
  const perfectOptions = {
    animationData: perfectLesson,
    loop: false,
  };
  const lessonResult: LessonResult = useMemo(
    () => getLessonResult(questions, answers, userData.characters),
    [questions, answers, userData.characters],
  );

  useEffect(() => {
    updateLessonResult(lessonResult);
  }, [lessonResult]);

  const { View } = useLottie(
    lessonResult.percentage == 100 ? perfectOptions : completeOptions,
  );

  if (lessonResult.percentage == 100) {
    return (
      <div className="mx-auto flex max-w-[300px] flex-col items-center">
        <div className={"p-16"}>{View}</div>
        <div className="-mt-8 text-center">
          <h1 className="text-2xl font-semibold">Perfect Lesson</h1>
          <p className="mt-2 text-lg text-foreground/70">
            You made no mistakes in this lesson
          </p>
        </div>
        <div className="mt-8 flex w-fit gap-6">
          <ResultCard
            label="Total Points"
            value={lessonResult.pointsEarned.toString()}
            valueColor="text-secondary-500"
            bgColor="bg-secondary-500/90"
          />
          <ResultCard
            label="Percentage"
            value={lessonResult.percentage.toString() + "%"}
            valueColor="text-primary-500"
            bgColor="bg-primary-500/90"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-auto flex max-w-[320px] flex-col items-center">
        <div className={"sm:scale-125"}>{View}</div>
        <div className="-mt-10 text-center">
          <h1 className="text-2xl font-semibold">Lesson Complete</h1>
          <p className="mt-2 text-lg text-foreground/70">
            You are one step closer to your goal
          </p>
        </div>
        <div className="mt-8 flex w-fit gap-6 sm:mt-4">
          <ResultCard
            label="Total Points"
            value={lessonResult.pointsEarned.toString()}
            valueColor="text-secondary-500"
            bgColor="bg-secondary-500/90"
          />
          <ResultCard
            label="Percentage"
            value={lessonResult.percentage.toString() + "%"}
            valueColor="text-primary-500"
            bgColor="bg-primary-500/90"
          />
        </div>
      </div>
    );
  }
};

export default LessonResultView;

const ResultCard = ({
  label,
  value,
  bgColor,
  valueColor,
}: {
  label: string;
  value: string;
  bgColor: string;
  valueColor: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl p-0.5",
        bgColor,
      )}
    >
      <span className={cn("px-4 text-center text-sm font-medium text-black")}>
        {label}
      </span>
      <span
        className={cn(
          "w-full rounded-xl bg-background px-8 py-3 text-center text-2xl font-semibold tracking-widest",
          valueColor,
        )}
      >
        {value}
      </span>
    </div>
  );
};
