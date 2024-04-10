"use client";
import LessonBottombar from "./lesson-bottombar";
import LessonHeader from "./lesson-header";
import MCQSign from "./questions/mcq-sign";
import {
  CharacterType,
  QuestionCharacter,
  QuestionType,
  Result,
  LessonStatus,
} from "@/types";
import { useLessonState } from "@/context/useLessonState";
import QuestionView from "./questions/question-view";

const LessonQuestions = () => {
  const questions: QuestionCharacter[] = [
    {
      character: "A",
      questionType: QuestionType.McqSign,
      options: ["B", "C", "D", "A"],
    },
    {
      character: "B",
      questionType: QuestionType.McqCharacter,
      options: ["D", "B", "C", "A"],
    },
    {
      character: "C",
      questionType: QuestionType.McqSign,
      options: ["A", "B", "C", "D"],
    },
    {
      character: "D",
      questionType: QuestionType.McqCharacter,
      options: ["D", "B", "A", "C"],
    },
  ];
  const { state, handleValueChange, handlePrimaryClick } =
    useLessonState(questions);

  return (
    <div className="relative h-fit min-h-screen w-full py-6 md:py-8">
      <LessonHeader progress={state.progress} streak={3} />
      {state.state !== LessonStatus.Complete && (
        <QuestionView
          questionType={questions[state.currentIndex].questionType}
          character={questions[state.currentIndex].character}
          options={questions[state.currentIndex].options}
          resultType={state.result?.type}
          type={CharacterType.Alphabets}
          value={state.answers[state.currentIndex]}
          onValueChange={handleValueChange}
        />
      )}
      <LessonBottombar
        state={state.state}
        result={state.result}
        isPrimaryDisabled={state.isPrimaryDisabled}
        onPrimaryClick={handlePrimaryClick}
      />
    </div>
  );
};

export default LessonQuestions;
