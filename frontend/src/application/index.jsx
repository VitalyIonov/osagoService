import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';

import { BrowserRouter, Switch, Route, Redirect } from 'common/components/router';
import { SWRProvider } from 'common/components/SWRProvider';
import { makeUrl } from 'common/utils/url';
import { PAGE_URLS } from 'common/constants/page';

import { ROUTES } from './routes';
import './styles/index.less';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0033AA',
      error: '#880000'
    },
    secondary: {
      main: '#880000',
    },
  },
  typography: {
    fontSize: 12,
  },
});

const container = document.getElementById('root');

const Application = () => (
  <BrowserRouter>
    <SWRProvider>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<div className="loader" />}>
          <Switch>
            {ROUTES.map((route) => (
              <Route key={route.path} {...route} />
            ))}
            <Route exact path="/" render={() => <Redirect to={makeUrl(PAGE_URLS.aggregator)} />} />
            <Redirect to={makeUrl(PAGE_URLS.aggregator)} />
          </Switch>
        </Suspense>
      </ThemeProvider>
    </SWRProvider>
  </BrowserRouter>
);

ReactDOM.render(<Application />, container);
