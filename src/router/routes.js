import React from 'react'

const PageOne = React.lazy(() => import('@pages/PageOne'))
const PageTwo = React.lazy(() => import('@pages/PageTwo'))

const routes = [
  {
    path: '/pageOne',
    component: PageOne,
  },
  {
    path: '/pageTwo',
    component: PageTwo,
  },
]

export default routes
