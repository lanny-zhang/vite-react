import React from 'react'
import Home from '../pages/Home'
import { flattenArray } from '../util/javascript'

const Form = React.lazy(() => import('@pages/Form'))
const Table = React.lazy(() => import('@pages/Table'))
const Detail = React.lazy(() => import('@pages/Detail'))
const SearchTable = React.lazy(() => import('@pages/SearchTable'))
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
    path: 'basic/form/basic-form',
    element: <Form />,
    title: 'Basic Form',
  },
  {
    path: 'basic/table/basic-table',
    element: <Table />,
    title: 'Basic Table',
    children: [
      {
        path: 'basic/table/basic-table/detail',
        element: <Detail />,
        title: 'Detail',
      },
    ],
  },
  {
    path: 'basic/table/search-table',
    element: <SearchTable />,
    title: 'Search Table',
  },
  {
    path: 'graphic/flow-editor',
    element: <FlowEditor />,
    title: 'Flow Editor',
  },
]

// eslint-disable-next-line import/no-mutable-exports
let flattenRoutes = null
if (!flattenRoutes) flattenRoutes = flattenArray(routes)

export default routes
export { flattenRoutes }
