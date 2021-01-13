import 'whatwg-fetch';
import withQuery from 'with-query';

import { API_DOMAIN } from 'common/constants/domains';
import { isApiError } from 'common/utils/system';

export const fetcher = fetcherParams => {
  const { methodUrl, method = 'GET', params } = fetcherParams;

  if (!methodUrl) return Promise.resolve({});

  const fullUrl = params ? withQuery(`${API_DOMAIN}/${methodUrl}`, params) : `${API_DOMAIN}/${methodUrl}`;

  const fetchParams = {
    method,
    headers: {
      'no-cors': true,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
  };

  return new Promise((resolve, reject) => {
    return fetch(fullUrl, fetchParams)
      .then(r => r.json())
      .then(data => {
        if (isApiError(data)) return reject(data);

        resolve(data);
      })
      .catch(reject);
  });
};

export const callRequest = (params, onSuccess, onFailure) => fetcher(params)
  .then(res => {
    if (onSuccess) {
      onSuccess(res, params);
    }
  }).catch(err => {
    if (onFailure) {
      onFailure(err);
    }
  });
