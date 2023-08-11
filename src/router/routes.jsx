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
    hidenSider: false,
  },
  {
    path: 'form',
    element: <Form />,
    title: 'Form',
  },
  {
    path: 'table',
    element: <Table />,
    title: 'Table',
    children: [
      {
        path: 'table/detail',
        element: <Detail />,
        title: 'Detail',
      },
    ],
  },

  {
    path: 'calender',
    element: <CalenderExample />,
    title: 'Calender',
  },
]

// eslint-disable-next-line import/no-mutable-exports
let flattenRoutes = null
if (!flattenRoutes) flattenRoutes = flattenArray(routes)

export default routes
export { flattenRoutes }
