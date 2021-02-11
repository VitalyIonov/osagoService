import { useMemo, useRef } from 'react';
import useSWR from 'swr';

import { fetcher } from 'common/services/http';

const useDeps = data => {
  const ref = useRef([data]);
  if (data) {
    ref.current = [data];
  }
  return ref.current;
};

function useFetcher({ methodUrl, params, stopper }, options) {
  const deps = params ? [methodUrl, ...Object.values(params)] : [methodUrl];

  const { data, error, mutate, isValidating } = useSWR(!stopper ? deps : null, () => fetcher({ methodUrl, params }), options);

  const memoData = useMemo(() => data || {}, useDeps(data));

  return [data, isValidating, mutate, error, params];
}

export default useFetcher;
