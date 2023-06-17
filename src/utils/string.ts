export const getPluralizedWord = (word: string, count: Number): string => {
  if (count === 1) {
    return word;
  }
  return word + "s";
};

export const formatAmountWithUnit = (word: string, count: number): string => {
  return `${count} ${getPluralizedWord(word, count)}`;
};
