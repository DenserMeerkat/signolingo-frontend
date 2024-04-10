export enum CharacterType {
  Alphabets = "alpha",
  Numbers = "num",
}

export enum ResultType {
  Correct = "Correct",
  Incorrect = "Incorrect",
}

export enum QuestionType {
  Introduction = "intro",
  McqSign = "mcq-sign",
  McqCharacter = "mcq-character",
  SignWithHint = "sign-with-Hint",
  SignWithoutHint = "sign-without-hint",
}

export enum LessonStatus {
  Result = "Result",
  Question = "Question",
  Complete = "Complete",
}

export interface ClassNameProp {
  className?: string;
}

export interface Result {
  type: ResultType;
  answer?: string;
}

export interface QuestionCharacter {
  character: string;
  questionType: QuestionType;
  options?: string[];
}

export interface CharacterQuestion {
  character: string;
  type: CharacterType;
  options?: string[];
  value?: string;
  onValueChange?: (value: string) => void;
  resultType?: ResultType;
}
