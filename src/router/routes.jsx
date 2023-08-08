import React from 'react'
import Home from '../pages/Home'

const Form = React.lazy(() => import('@@/src/pages/Form'))
const Table = React.lazy(() => import('@@/src/pages/Table'))
const CalenderExample = React.lazy(() => import('@@/src/pages/CalenderExample'))

const routes = [
  {
    path: '/',
    index: true,
    element: <Home />,
  },
  {
    path: '/form',
    element: <Form />,
    title: '表单',
  },
  {
    path: '/table',
    element: <Table />,
    title: '表格',
  },
  {
    path: '/calender',
    element: <CalenderExample />,
    title: '日历',
  },
]

export default routes
