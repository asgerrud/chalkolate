export const getPluralizedWord = (word: string, count: Number): string => {
  if (count === 1) {
    return word;
  }

  if (word.endsWith("s") || word.endsWith("x") || word.endsWith("z") || word.endsWith("ch") || word.endsWith("sh")) {
    return word + "es";
  } else if (word.endsWith("y")) {
    // Change 'y' to 'ies'
    return word.slice(0, -1) + "ies";
  } else {
    return word + "s";
  }
};

export const formatAmountWithUnit = (word: string, count: number): string => {
  return `${count} ${getPluralizedWord(word, count)}`;
};
