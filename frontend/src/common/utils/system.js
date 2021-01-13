const isApiError = input => typeof input === 'object' && input.status === 'error' && input.code;

export {
  isApiError
};
