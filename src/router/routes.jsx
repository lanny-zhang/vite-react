import React from 'react'
import Home from '../pages/Home'
import { flattenArray } from '../util/javascript'

const Form = React.lazy(() => import('@pages/Form'))
const Table = React.lazy(() => import('@pages/Table'))
const Detail = React.lazy(() => import('@pages/Detail'))
const CalenderExample = React.lazy(() => import('@pages/CalenderExample'))

const routes = [
  {
    path: '/',
    index: true,
    element: <Home />,
  },
  {
    path: 'form',
    element: <Form />,
    title: '表单',
  },
  {
    path: 'table',
    element: <Table />,
    title: '表格',
    children: [
      {
        path: 'detail',
        element: <Detail />,
        title: '详情',
      },
    ],
  },

  {
    path: 'calender',
    element: <CalenderExample />,
    title: '日历',
  },
]

const flattenRoutes = flattenArray(routes)

export default routes
export { flattenRoutes }
