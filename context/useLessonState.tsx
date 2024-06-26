"use client";
import { useEffect, useReducer } from "react";
import {
  QuestionCharacter,
  Result,
  ResultType,
  LessonStatus,
  QuestionType,
  LessonResult,
} from "@/types";

interface LessonState {
  progress: number;
  status: LessonStatus;
  result: Result | undefined;
  isPrimaryDisabled: boolean;
  showSecondaryButton: boolean;
  showResult: boolean;
  currentIndex: number;
  answers: string[];
  lessonResult?: LessonResult;
}

type Action =
  | { type: "SET_PROGRESS"; progress: number }
  | { type: "SET_STATUS"; status: LessonStatus }
  | { type: "SET_RESULT"; result: Result | undefined }
  | { type: "SET_IS_PRIMARY_DISABLED"; isPrimaryDisabled: boolean }
  | { type: "SET_SHOW_SECONDARY_BUTTON"; showSecondaryButton: boolean }
  | { type: "SET_SHOW_RESULT"; showResult: boolean }
  | { type: "SET_CURRENT_INDEX"; currentIndex: number }
  | { type: "SET_ANSWERS"; answers: string[] }
  | { type: "SET_LESSON_RESULT"; lessonResult: LessonResult };

function reducer(state: LessonState, action: Action): LessonState {
  switch (action.type) {
    case "SET_PROGRESS":
      return { ...state, progress: action.progress };
    case "SET_STATUS":
      return { ...state, status: action.status };
    case "SET_RESULT":
      return { ...state, result: action.result };
    case "SET_IS_PRIMARY_DISABLED":
      return { ...state, isPrimaryDisabled: action.isPrimaryDisabled };
    case "SET_SHOW_SECONDARY_BUTTON":
      return { ...state, showSecondaryButton: action.showSecondaryButton };
    case "SET_SHOW_RESULT":
      return { ...state, showResult: action.showResult };
    case "SET_CURRENT_INDEX":
      return { ...state, currentIndex: action.currentIndex };
    case "SET_ANSWERS":
      return { ...state, answers: action.answers };
    case "SET_LESSON_RESULT":
      return { ...state, lessonResult: action.lessonResult };
    default:
      return state;
  }
}

export const useLessonState = (questions: QuestionCharacter[]) => {
  const [state, dispatch] = useReducer(reducer, {
    progress: 0,
    status: LessonStatus.Result,
    result: undefined,
    isPrimaryDisabled: true,
    showSecondaryButton: false,
    showResult: false,
    currentIndex: 0,
    answers: Array(questions.length).fill(null),
    lessonResult: undefined,
  });

  useEffect(() => {
    if (state.status === LessonStatus.Question) {
      dispatch({
        type: "SET_IS_PRIMARY_DISABLED",
        isPrimaryDisabled: !state.answers[state.currentIndex],
      });
    }
  }, [state.status, state.currentIndex, state.answers]);

  const handleValueChange = (value: string) => {
    dispatch({
      type: "SET_ANSWERS",
      answers: state.answers.map((answer, i) =>
        i === state.currentIndex ? value : answer,
      ),
    });
    dispatch({ type: "SET_IS_PRIMARY_DISABLED", isPrimaryDisabled: false });
    console.log(state.answers);
  };

  const triggerAnswerSubmission = (value: string, forceTrue?: boolean) => {
    dispatch({
      type: "SET_ANSWERS",
      answers: state.answers.map((answer, index) =>
        index === state.currentIndex ? value : answer,
      ),
    });
    handleAnswerSubmission(forceTrue ?? true);
  };

  const handleAnswerSubmission = (forceTrue?: boolean) => {
    const correctAnswer = questions[state.currentIndex].character;
    const isCorrect = state.answers[state.currentIndex] === correctAnswer;
    dispatch({
      type: "SET_RESULT",
      result: {
        type: forceTrue
          ? ResultType.Correct
          : isCorrect
            ? ResultType.Correct
            : ResultType.Incorrect,
        answer: correctAnswer,
        optionIndex:
          questions[state.currentIndex].options?.indexOf(correctAnswer),
        questionType: questions[state.currentIndex].questionType,
      },
    });

    dispatch({
      type: "SET_SHOW_RESULT",
      showResult:
        questions[state.currentIndex].questionType == QuestionType.Introduction
          ? false
          : true,
    });

    dispatch({ type: "SET_STATUS", status: LessonStatus.Result });

    const progress = ((state.currentIndex + 1) * 100) / questions.length;
    dispatch({ type: "SET_PROGRESS", progress });
  };

  const handleMoveToNextQuestion = () => {
    if (state.currentIndex + 1 < questions.length) {
      dispatch({
        type: "SET_CURRENT_INDEX",
        currentIndex: state.currentIndex + 1,
      });
      dispatch({ type: "SET_STATUS", status: LessonStatus.Question });
    } else {
      dispatch({ type: "SET_STATUS", status: LessonStatus.Complete });
    }
    dispatch({ type: "SET_RESULT", result: undefined });

    const progress = ((state.currentIndex + 1) * 100) / questions.length;
    dispatch({ type: "SET_PROGRESS", progress });
  };

  const handlePrimaryClick = (questionType: QuestionType) => {
    if (state.status === LessonStatus.Result) {
      handleMoveToNextQuestion();
    } else if (
      state.status === LessonStatus.Question &&
      questionType != QuestionType.Introduction
    ) {
      handleAnswerSubmission();
    } else if (questionType == QuestionType.Introduction) {
      handleMoveToNextQuestion();
    }
  };

  const updateLessonResult = (lessonResult: LessonResult) => {
    dispatch({ type: "SET_LESSON_RESULT", lessonResult });
  };

  return {
    state,
    handleValueChange,
    handlePrimaryClick,
    triggerAnswerSubmission,
    updateLessonResult,
  };
};
