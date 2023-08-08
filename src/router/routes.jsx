import React from 'react'
import Home from '../pages/Home'

const PageOne = React.lazy(() => import('@pages/PageOne'))
const PageTwo = React.lazy(() => import('@pages/PageTwo'))

const routes = [
  {
    path: '/',
    index: true,
    element: <Home />,
  },
  {
    path: '/pageOne',
    element: <PageOne />,
    title: 'one',
  },
  {
    path: '/pageTwo',
    element: <PageTwo />,
    title: 'two',
  },
]

export default routes
