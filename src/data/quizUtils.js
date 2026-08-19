export const answerModes = {
  typing: "Gõ đáp án",
  multipleChoice: "Trắc nghiệm",
};

export const shuffleItems = (items) => {
  const shuffledItems = [...items];

  for (let i = shuffledItems.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledItems[i], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[i],
    ];
  }

  return shuffledItems;
};

export const createMultipleChoiceOptions = (
  items,
  correctValue,
  getValue = (item) => item.romaji,
) => {
  const distractors = [...new Set(items.map(getValue))]
    .filter((value) => value !== correctValue);

  return shuffleItems([
    correctValue,
    ...shuffleItems(distractors).slice(0, 3),
  ]);
};

export const getShortMeaning = (meaning) => {
  const beforeParen = meaning.split("(")[0].trim();
  return beforeParen || meaning.trim();
};
