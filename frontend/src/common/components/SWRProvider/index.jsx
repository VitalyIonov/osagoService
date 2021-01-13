import React from 'react';
import PropTypes from 'prop-types';
import { SWRConfig } from 'swr';

import { fetcher } from 'common/services/http';

export const SWRProvider = ({ children }) => (
  <SWRConfig
    value={{
      fetcher,
      revalidateOnFocus: false,
      suspense: false,
      dedupingInterval: 100,
    }}
  >
    {children}
  </SWRConfig>
);

SWRProvider.propTypes = {
  children: PropTypes.element.isRequired
};
