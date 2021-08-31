import React from 'react';

const routes = [
  {
    component: React.lazy(() => import('../layouts/baseLayout')),
    name: 'layout',
    routes: [
      //子路由
      {
        path: '/',
        component: React.lazy(() => import('../pages/home/index')),
      },
    ],
  },
  {
    path: '*',
    component: React.lazy(() => import('../pages/home/index')),
    name: 'err404',
  },
];

export default routes;
