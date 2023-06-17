export const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});
