import React from 'react';
import { RouteConfig } from 'react-router-config';

const LoginRoute: RouteConfig[] = [
  {
    name: 'login',
    path: '/login',
    component: React.lazy(() => import('../../pages/login/index')),
    exact: true,
  },
];

export default LoginRoute;
