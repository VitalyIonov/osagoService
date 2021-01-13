import React from 'react';

import { PAGE_URLS } from 'common/constants/page';
import { makeUrl } from 'common/utils/url';

const AggregationPage = React.lazy(() => import('pages/aggregationPage'));

const ROUTES = [
  {
    path: makeUrl(PAGE_URLS.aggregator),
    component: AggregationPage,
    exact: true
  }
];

export {
  ROUTES
};
