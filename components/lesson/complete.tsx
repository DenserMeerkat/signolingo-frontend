import React from "react";
import { useLottie } from "lottie-react";
import complete from "@/public/animations/complete.json";
import { QuestionCharacter } from "@/types";

interface LessonCompleteProps {
  questions: QuestionCharacter[];
  answers: string[];
}

const LessonComplete = ({ questions, answers }: LessonCompleteProps) => {
  const options = {
    animationData: complete,
    loop: false,
  };
  const { View } = useLottie(options);
  return (
    <>
      <div className="mx-auto max-w-sm">{View}</div>
      <div className="-mt-8 text-center">
        <h1 className="text-2xl font-semibold">Lesson Complete</h1>
        <p className="mt-2 text-lg text-gray-500">
          You have successfully completed the lesson
        </p>
      </div>
    </>
  );
};

export default LessonComplete;
