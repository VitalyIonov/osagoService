export const composeValidators = (...validators) => value => validators
  .reduce((error, validator) => error || validator(value), undefined);

export const required = value => (value ? undefined : 'Обязательное');

export const isValidPhone = value => {
  const regExp = /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/;

  return regExp.test(value) ? undefined : 'Неверный номер';
};

export const isValidEmail = value => {
  const regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  return regExp.test(value) ? undefined : 'Неверный email';
};
