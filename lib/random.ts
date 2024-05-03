import {
  uniqueUsernameGenerator,
  Config,
  adjectives,
  nouns,
} from "unique-username-generator";

export const randomUsername = (): string => {
  const config: Config = {
    dictionaries: [adjectives, nouns],
    length: 20,
    separator: "-",
    randomDigits: 2,
  };
  const username = uniqueUsernameGenerator(config);
  const arr = username.split("-");
  const capitalizedArr = arr.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
  const capitalizedUsername = capitalizedArr.join("");
  return capitalizedUsername;
};

export const randomCorrectMessage = (): string => {
  const success = [
    "Correct!",
    "Excellent!",
    "Fantastic!",
    "Perfect!",
    "Awesome!",
    "Superb!",
    "Terrific!",
    "Spot on!",
    "Right on!",
    "Wonderful!",
  ];
  return success[Math.floor(Math.random() * success.length)];
};

export const randomIncorrectMessage = (): string => {
  const failure = [
    "Incorrect!",
    "Oops!",
    "Wrong Answer.",
    "That's Incorrect.",
    "That's a Mistake.",
  ];
  return failure[Math.floor(Math.random() * failure.length)];
};
