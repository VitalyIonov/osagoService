import { PAGE_URLS } from 'common/constants/page';
import { makeUrl } from 'common/utils/url';
import AggregationPage from 'pages/aggregationPage';

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
