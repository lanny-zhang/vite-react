import React from 'react'
import Home from '../pages/Home'
import { flattenArray } from '../util/javascript'

const Form = React.lazy(() => import('@pages/Form'))
const Table = React.lazy(() => import('@pages/Table'))
const Detail = React.lazy(() => import('@pages/Detail'))
const CalenderExample = React.lazy(() => import('@pages/CalenderExample'))

const routes = [
  {
    path: '',
    index: true,
    title: 'Home',
    element: <Home />,
    hidenTab: true,
    hidenSlider: false,
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
        path: 'table/detail',
        element: <Detail />,
        title: '详情',
      },
      {
        path: 'table/instance',
        element: <Detail />,
        title: '实例',
        children: [{
          path: 'instance/list',
          element: <Detail />,
          title: '实例',
        }],
      },
    ],
  },

  {
    path: 'calender',
    element: <CalenderExample />,
    title: '日历',
  },
]

// eslint-disable-next-line import/no-mutable-exports
let flattenRoutes = null
if (!flattenRoutes) flattenRoutes = flattenArray(routes)

export default routes
export { flattenRoutes }
