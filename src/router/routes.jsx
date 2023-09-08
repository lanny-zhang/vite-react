import React from 'react'
import Home from '../pages/Home'
import { flattenArray } from '../util/javascript'

const Form = React.lazy(() => import('@pages/Form'))
const BasicForm = React.lazy(() => import('@pages/BasicForm'))
const Table = React.lazy(() => import('@pages/Table'))
const Detail = React.lazy(() => import('@pages/Detail'))
const SearchTable = React.lazy(() => import('@pages/SearchTable'))
const Error404 = React.lazy(() => import('@components/Exceptions/Error404'))
const Error403 = React.lazy(() => import('@components/Exceptions/Error403'))
const Error500 = React.lazy(() => import('@components/Exceptions/Error500'))
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
    path: 'basic/form/schema-form',
    element: <Form />,
    title: 'Schema Form',
  },
  {
    path: 'basic/form/basic-form',
    element: <BasicForm />,
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
    path: 'basic/exception/404',
    element: <Error404 />,
    title: '404',
  },
  {
    path: 'basic/exception/403',
    element: <Error403 />,
    title: '403',
  },
  {
    path: 'basic/exception/500',
    element: <Error500 />,
    title: '500',
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
