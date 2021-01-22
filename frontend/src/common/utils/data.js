export const isObjectEmpty = object => Object.keys(object).length === 0;

export const isInteger = (number) => (number ^ 0) === number;

export const getArrayItem = (data, condition) => {
  if (!data || data.length === 0) {
    return null;
  }

  let result = null;

  data.forEach(item => {
    if (condition(item)) {
      result = item;
    }
  });

  return result;
};
