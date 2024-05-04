import { CharacterQuestion, QuestionType } from "@/types";
import React from "react";
import MCQCharacter from "./mcq-character";
import MCQSign from "./mcq-sign";
import Introduction from "./character-intro";
import SignWithHint from "./sign-with-hint";
import SignWithoutHint from "./sign-without-hint";

export interface QuestionViewProps extends CharacterQuestion {
  questionType: QuestionType;
}

const QuestionView = (props: QuestionViewProps) => {
  const { questionType } = props;
  const { character, options, resultType, type, value, onValueChange } = props;
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
        <SignWithHint
          key={character}
          character={character}
          options={options}
          resultType={resultType}
          type={type}
          value={value}
          onValueChange={onValueChange}
        />
      );
    case QuestionType.SignWithoutHint:
      return (
        <SignWithoutHint
          key={character}
          character={character}
          options={options}
          resultType={resultType}
          type={type}
          value={value}
          onValueChange={onValueChange}
        />
      );
    default:
      return null;
  }
};

export default QuestionView;
