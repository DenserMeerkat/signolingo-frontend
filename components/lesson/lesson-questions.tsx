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
  const { appUser, userData } = useAppContext();
  const alphabetQuestions: QuestionCharacter[] = useMemo(() => {
    return getLesson(userData.characters, CharacterType.Alphabets).filter(
      (q: QuestionCharacter) =>
        q.questionType == QuestionType.McqCharacter ||
        q.questionType == QuestionType.McqSign,
    );
  }, [userData]);

  const numberQuestions: QuestionCharacter[] = useMemo(() => {
    return getLesson(userData.characters, CharacterType.Numbers).filter(
      (q: QuestionCharacter) =>
        q.questionType == QuestionType.McqCharacter ||
        q.questionType == QuestionType.McqSign,
    );
  }, [userData]);

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
