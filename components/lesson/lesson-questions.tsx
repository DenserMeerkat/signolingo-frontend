"use client";
import React, { useState, useEffect } from "react";
import LessonBottombar, {
  BottombarState,
  ResultType,
} from "./lesson-bottombar";
import LessonHeader from "./lesson-header";
import MCQSign from "./questions/mcq-sign";

const LessonQuestions = () => {
  const [state, setState] = useState<BottombarState>(BottombarState.Question);
  const [resultType, setResultType] = useState<ResultType>(ResultType.Correct);

  useEffect(() => {
    const bottomBarStates = [
      BottombarState.Question,
      BottombarState.Complete,
      BottombarState.Result,
    ];
    const resultTypes = [ResultType.Correct, ResultType.Incorrect];

    setState(
      bottomBarStates[Math.floor(Math.random() * bottomBarStates.length)],
    );
    setResultType(resultTypes[Math.floor(Math.random() * resultTypes.length)]);
  }, []);

  return (
    <div className="relative h-fit min-h-screen w-full py-6 md:py-8">
      <LessonHeader progress={40} streak={3} />
      <MCQSign />
      <LessonBottombar
        state={state}
        result={{
          type: resultType,
          answer: "A",
        }}
        isPrimaryDisabled={false}
        onPrimaryClick={() => {}}
      />
    </div>
  );
};

export default LessonQuestions;
