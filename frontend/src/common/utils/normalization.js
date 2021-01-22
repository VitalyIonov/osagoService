import { isInteger } from 'common/utils/data';

export const normalizeNumberByLength = (length) => (value) =>
  [].map
    .call(value, (litera, index) => {
      if (index + 1 > length) {
        return '';
      }

      if (litera !== ' ' && isInteger(Number(litera))) {
        return litera;
      }

      return '';
    })
    .join('');
