import React from 'react'
// import PageOne from '../pages/PageOne'
// import PageTwo from '../pages/PageTwo'
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
    title: 'hhhh',
  },
  {
    path: '/pageTwo',
    element: <PageTwo />,
    title: 'bbbbisExistTab',
  },
]

export default routes
