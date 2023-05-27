export const getGradeColor = (color: string, inactive?: boolean): string => {
  if (inactive) {
    return color === "black" ? "gray.500" : `${color}.100`;
  } else {
    return color === "black" ? "gray.500" : `${color}.100`;
  }
};
