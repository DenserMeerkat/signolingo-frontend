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
import { useRouter, useSearchParams } from "next/navigation";
import { getLesson } from "@/lib/lesson";
import { useAppContext } from "@/context/app-context";
import { useMemo } from "react";
import { getCharacterType } from "@/lib/utils";
import LessonResultView from "./result";

const LessonQuestions = () => {
  const { appUser, userData, updateUserData } = useAppContext();
  const alphabetQuestions: QuestionCharacter[] = useMemo(() => {
    return getLesson(userData.characters, CharacterType.Alphabets);
  }, [userData.characters]);

  const numberQuestions: QuestionCharacter[] = useMemo(() => {
    return getLesson(userData.characters, CharacterType.Numbers);
  }, [userData.characters]);

  const router = useRouter();
  const search = useSearchParams();

  const questions = useMemo(() => {
    return search.get("c") === CharacterType.Alphabets
      ? alphabetQuestions
      : numberQuestions;
  }, [search, alphabetQuestions, numberQuestions]);

  const {
    state,
    handleValueChange,
    handlePrimaryClick,
    triggerAnswerSubmission,
    updateLessonResult,
  } = useLessonState(questions);

  const handleLessonResultUpdate = () => {
    router.push("/learn?" + search.toString());
    updateUserData({
      ...userData,
      characters: state.lessonResult!.updatedCharacterProgress,
    });
  };

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
        <LessonResultView
          questions={questions}
          answers={state.answers}
          updateLessonResult={updateLessonResult}
        />
      )}
      <LessonBottombar
        status={state.status}
        result={state.result}
        isPrimaryDisabled={state.isPrimaryDisabled}
        showSecondaryButton={state.showSecondaryButton}
        showResult={state.showResult}
        onPrimaryClick={
          state.status === LessonStatus.Complete
            ? handleLessonResultUpdate
            : () =>
                handlePrimaryClick(questions[state.currentIndex].questionType)
        }
      />
    </div>
  );
};

export default LessonQuestions;
