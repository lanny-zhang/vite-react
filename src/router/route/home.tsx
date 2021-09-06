import React from 'react';
import { RouteConfig } from 'react-router-config';

const HomeRoute: RouteConfig[] = [
  {
    name: 'home',
    path: '/home',
    component: React.lazy(() => import('../../pages/home/index')),
    exact: true,
    requiresAuth: true,
  },
];

export default HomeRoute;
