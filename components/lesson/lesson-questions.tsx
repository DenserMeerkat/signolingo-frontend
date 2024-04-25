"use client";
import LessonBottombar from "./lesson-bottombar";
import LessonHeader from "./lesson-header";
import {
  CharacterType,
  QuestionCharacter,
  QuestionType,
  LessonStatus,
} from "@/types";
import { useLessonState } from "@/context/useLessonState";
import QuestionView from "./questions/question-view";
import { useSearchParams } from "next/navigation";
import { getLesson } from "@/lib/lesson";
import { useAppContext } from "@/context/app-context";
import { useMemo } from "react";

const LessonQuestions = () => {
  const { user, progress } = useAppContext();
  const alphabetQuestions: QuestionCharacter[] = useMemo(() => {
    return getLesson(progress.characters, CharacterType.Alphabets).filter(
      (q: QuestionCharacter) =>
        q.questionType == QuestionType.McqCharacter ||
        q.questionType == QuestionType.McqSign,
    );
  }, [progress]);
  // [
  //   {
  //     character: "A",
  //     questionType: QuestionType.McqSign,
  //     options: ["B", "C", "D", "A"],
  //   },
  //   {
  //     character: "B",
  //     questionType: QuestionType.McqCharacter,
  //     options: ["D", "B", "C", "A"],
  //   },
  //   {
  //     character: "C",
  //     questionType: QuestionType.McqSign,
  //     options: ["A", "B", "C", "D"],
  //   },
  //   {
  //     character: "D",
  //     questionType: QuestionType.McqCharacter,
  //     options: ["D", "B", "A", "C"],
  //   },
  // ];

  const numberQuestions: QuestionCharacter[] = useMemo(() => {
    return getLesson(progress.characters, CharacterType.Numbers).filter(
      (q: QuestionCharacter) =>
        q.questionType == QuestionType.McqCharacter ||
        q.questionType == QuestionType.McqSign,
    );
  }, [progress]);

  // [
  //   {
  //     character: "1",
  //     questionType: QuestionType.McqSign,
  //     options: ["2", "3", "4", "1"],
  //   },
  //   {
  //     character: "2",
  //     questionType: QuestionType.McqCharacter,
  //     options: ["4", "2", "3", "1"],
  //   },
  //   {
  //     character: "3",
  //     questionType: QuestionType.McqSign,
  //     options: ["1", "2", "3", "4"],
  //   },
  //   {
  //     character: "4",
  //     questionType: QuestionType.McqCharacter,
  //     options: ["4", "2", "1", "3"],
  //   },
  // ];

  const search = useSearchParams();

  const questions =
    search.get("c") === CharacterType.Alphabets
      ? alphabetQuestions
      : numberQuestions;
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
