import React from 'react';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';

const HomeRoute: RouteConfig[] = [
  {
    name: 'home',
    path: '/home',
    component: React.lazy(() => import('../../pages/home/index')),
    exact: true,
  },
];

export default HomeRoute;
