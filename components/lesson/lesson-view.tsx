"use client";
import LessonBottombar from "./bottombar";
import LessonHeader from "./header";
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
import { getCharacterType } from "@/lib/utils";
import LessonComplete from "./complete";

const LessonQuestions = () => {
  const { appUser, userData } = useAppContext();
  const alphabetQuestions: QuestionCharacter[] = useMemo(() => {
    return getLesson(userData.characters, CharacterType.Alphabets);
  }, [userData]);

  const numberQuestions: QuestionCharacter[] = useMemo(() => {
    return getLesson(userData.characters, CharacterType.Numbers);
  }, [userData]);

  const search = useSearchParams();

  const questions =
    search.get("c") === CharacterType.Alphabets
      ? alphabetQuestions
      : numberQuestions;
  const {
    state,
    handleValueChange,
    handlePrimaryClick,
    triggerAnswerSubmission,
  } = useLessonState(questions);

  return (
    <div className="relative h-fit min-h-screen w-full py-6 md:py-8">
      <LessonHeader progress={state.progress} streak={3} />
      {state.status !== LessonStatus.Complete ? (
        <QuestionView
          questionType={questions[state.currentIndex].questionType}
          character={questions[state.currentIndex].character}
          options={questions[state.currentIndex].options}
          resultType={state.result?.type}
          type={getCharacterType(questions[state.currentIndex].character)}
          value={state.answers[state.currentIndex]}
          onValueChange={handleValueChange}
          triggerAnswerSubmission={triggerAnswerSubmission}
        />
      ) : (
        <LessonComplete questions={questions} answers={state.answers} />
      )}
      <LessonBottombar
        status={state.status}
        result={state.result}
        isPrimaryDisabled={state.isPrimaryDisabled}
        showSecondaryButton={state.showSecondaryButton}
        showResult={state.showResult}
        onPrimaryClick={() => {
          handlePrimaryClick(questions[state.currentIndex].questionType);
        }}
      />
    </div>
  );
};

export default LessonQuestions;
