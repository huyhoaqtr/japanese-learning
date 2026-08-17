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

export const createMultipleChoiceOptions = (characters, correctRomaji) => {
  const distractors = [...new Set(characters.map((character) => character.romaji))]
    .filter((romaji) => romaji !== correctRomaji);

  return shuffleItems([
    correctRomaji,
    ...shuffleItems(distractors).slice(0, 3),
  ]);
};
