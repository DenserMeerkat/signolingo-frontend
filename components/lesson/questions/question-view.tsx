import { CharacterQuestion, QuestionType } from "@/types";
import React from "react";
import MCQCharacter from "./mcq-character";
import MCQSign from "./mcq-sign";
import Introduction from "./character-intro";
import SignWithOrWithoutHint from "./sign-with-or-without-hint";

export interface QuestionViewProps extends CharacterQuestion {
  questionType: QuestionType;
  triggerAnswerSubmission: (value: string) => void;
}

const QuestionView = (props: QuestionViewProps) => {
  const { questionType } = props;
  const {
    character,
    options,
    resultType,
    type,
    value,
    onValueChange,
    triggerAnswerSubmission,
  } = props;
  switch (questionType) {
    case QuestionType.McqCharacter:
      return (
        <MCQCharacter
          key={character}
          character={character}
          options={options}
          resultType={resultType}
          type={type}
          value={value}
          onValueChange={onValueChange}
        />
      );
    case QuestionType.McqSign:
      return (
        <MCQSign
          key={character}
          character={character}
          options={options}
          resultType={resultType}
          type={type}
          value={value}
          onValueChange={onValueChange}
        />
      );
    case QuestionType.Introduction:
      return (
        <Introduction
          key={character}
          character={character}
          options={options}
          resultType={resultType}
          type={type}
          value={value}
          onValueChange={onValueChange}
        />
      );
    case QuestionType.SignWithHint:
      return (
        <SignWithOrWithoutHint
          key={character}
          character={character}
          options={options}
          resultType={resultType}
          type={type}
          value={value}
          onValueChange={onValueChange}
          triggerAnswerSubmission={triggerAnswerSubmission}
          showHint={true}
        />
      );
    case QuestionType.SignWithoutHint:
      return (
        <SignWithOrWithoutHint
          key={character}
          character={character}
          options={options}
          resultType={resultType}
          type={type}
          value={value}
          onValueChange={onValueChange}
          triggerAnswerSubmission={triggerAnswerSubmission}
          showHint={false}
        />
      );
    default:
      return null;
  }
};

export default QuestionView;
