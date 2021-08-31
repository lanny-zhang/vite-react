import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Suspense } from 'react';
import routes from './router';
import './styles/global.less';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>loading...</div>}>
      <Router>{renderRoutes(routes)}</Router>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
