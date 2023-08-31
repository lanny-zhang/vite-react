import React from 'react'
import Home from '../pages/Home'
import { flattenArray } from '../util/javascript'

const Form = React.lazy(() => import('@pages/Form'))
const Descriptions = React.lazy(() => import('@pages/Descriptions'))
const Table = React.lazy(() => import('@pages/Table'))
const Detail = React.lazy(() => import('@pages/Detail'))
const CalenderExample = React.lazy(() => import('@pages/CalenderExample'))
const FlowEditor = React.lazy(() => import('@pages/FlowEditor'))

const routes = [
  {
    path: '',
    index: true,
    title: 'Home',
    element: <Home />,
    hideTab: true,
    hideSider: true,
  },
  {
    path: 'basic/general/form',
    element: <Form />,
    title: 'Form',
  },
  {
    path: 'basic/general/table',
    element: <Table />,
    title: 'Table',
    children: [
      {
        path: 'basic/general/table/detail',
        element: <Detail />,
        title: 'Detail',
      },
    ],
  },
  {
    path: 'basic/descriptions',
    element: <Descriptions />,
    title: 'Descriptions',
  },
  {
    path: 'basic/general/calender',
    element: <CalenderExample />,
    title: 'Calender',
  },
  {
    path: 'complex/graphic/flow',
    element: <FlowEditor />,
    title: 'Flow Editor',
  },
]

// eslint-disable-next-line import/no-mutable-exports
let flattenRoutes = null
if (!flattenRoutes) flattenRoutes = flattenArray(routes)

export default routes
export { flattenRoutes }
