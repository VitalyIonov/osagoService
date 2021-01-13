import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route, Redirect } from 'common/components/router';
import { SWRProvider } from 'common/components/SWRProvider';
import { makeUrl } from 'common/utils/url';
import { PAGE_URLS } from 'common/constants/page';

import { ROUTES } from './routes';
import './styles/index.less';

const container = document.getElementById('root');

const Application = () => (
  <BrowserRouter>
    <SWRProvider>
      <Suspense fallback={<div className="loader" />}>
        <Switch>
          {ROUTES.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route exact path="/" render={() => <Redirect to={makeUrl(PAGE_URLS.aggregator)} />} />
          <Redirect to={makeUrl(PAGE_URLS.aggregator)} />
        </Switch>
      </Suspense>
    </SWRProvider>
  </BrowserRouter>
);

ReactDOM.render(<Application />, container);
