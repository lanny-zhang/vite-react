import React from 'react';
import { ExtendRouteConfig } from '../index';

const HomeRoute: ExtendRouteConfig[] = [
  {
    name: 'home',
    path: '/home',
    component: React.lazy(() => import('../../pages/home/index')),
    exact: true,
    //是否需要鉴权
    requiresAuth: true,
  },
];

export default HomeRoute;
