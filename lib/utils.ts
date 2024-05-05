import {
  CharacterType,
  LessonResult,
  QuestionCharacter,
  QuestionType,
} from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCharacterType(character: string): CharacterType {
  if (character.match(/[a-zA-Z]/)) {
    return CharacterType.Alphabets;
  } else {
    return CharacterType.Numbers;
  }
}

export function getLessonScorePercentage(
  questions: QuestionCharacter[],
  answers: string[],
): number {
  const totatl = questions.length;
  let score = 0;
  questions.forEach((question, index) => {
    if (question.character === answers[index]) {
      score++;
    }
  });
  return Math.floor((score / totatl) * 100);
}

export function getCharacterPoints(
  questions: QuestionCharacter[],
  answers: string[],
): Record<string, number> {
  let points: Record<string, number> = {};
  questions.forEach((question, index) => {
    let point = 0;
    if (question.character === answers[index]) {
      switch (question.questionType) {
        case QuestionType.Introduction:
          point = 1;
          break;
        case QuestionType.McqCharacter:
        case QuestionType.McqSign:
          point = 3;
          break;
        case QuestionType.SignWithHint:
        case QuestionType.SignWithoutHint:
          point = 6;
          break;
        default:
          break;
      }
    }
    const currentPoints = points[question.character] || 0;
    points[question.character] = currentPoints + point;
  });
  return points;
}

export function getLessonResult(
  questions: QuestionCharacter[],
  answers: string[],
  charactersProgress: Record<string, number>,
): LessonResult {
  const percentage = getLessonScorePercentage(questions, answers);
  const points = getCharacterPoints(questions, answers);
  let updatedCharacterProgress = { ...charactersProgress };
  let pointsEarned = 0;

  Object.entries(points).forEach(([character, point]) => {
    const initialProgress = updatedCharacterProgress[character] || 0;
    const updatedProgress = Math.min(initialProgress + point, 100);
    updatedCharacterProgress[character] = updatedProgress;

    const pointsDifference = updatedProgress - initialProgress;
    pointsEarned += pointsDifference;
  });

  return {
    updatedCharacterProgress,
    percentage,
    pointsEarned,
  };
}
