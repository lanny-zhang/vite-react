import React from 'react';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';
import HomeRoute from './home';

const Routers: RouteConfig[] = [
  {
    path: '/',
    component: React.lazy(() => import('../layouts/index')),
    name: 'layout',
    routes: HomeRoute,
  },
  { path: '*', exact: true, render: () => <Redirect to={'/404'} /> },
  {
    path: '/404',
    component: React.lazy(() => import('./Exceptions/Error404')),
    name: 'err404',
  },
];

export default Routers;
