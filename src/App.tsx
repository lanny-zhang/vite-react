import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './ErrorBoundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Suspense } from 'react';
import routes from './router';
import './styles/global.less';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <Router>{renderRoutes(routes)}</Router>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
