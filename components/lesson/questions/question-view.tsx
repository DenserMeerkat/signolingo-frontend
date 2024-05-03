import { CharacterQuestion, QuestionType } from "@/types";
import React from "react";
import MCQCharacter from "./mcq-character";
import MCQSign from "./mcq-sign";
import Introduction from "./character-intro";

export interface QuestionViewProps extends CharacterQuestion {
  questionType: QuestionType;
}

const QuestionView = (porps: QuestionViewProps) => {
  const { questionType } = porps;
  const { character, options, resultType, type, value, onValueChange } = porps;
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
    default:
      return null;
  }
};

export default QuestionView;
