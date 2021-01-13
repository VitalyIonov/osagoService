/* eslint camelcase: 0 */

export const makeUrl = (...urls) => {
  if (
    urls.length === 0
    || (urls.length === 1 && !urls[0])
  ) return '/';

  return `/${urls.join('/')}/`;
};

export const makeUrlSearch = params => {
  if (!params) {
    return '';
  }

  const searchParams = new URLSearchParams('');

  Object.keys(params).forEach(key => {
    if (params[key] == null) return;
    searchParams.set(key, params[key]);
  });

  return searchParams.toString();
};

export const makeFullUrl = (urls, params) => `${makeUrl(...urls)}?${makeUrlSearch(params)}`;
