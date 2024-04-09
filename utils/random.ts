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
