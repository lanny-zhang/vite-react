import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import SiderLayout from '../layouts/SiderLayout'
import RequireAuth from './RequireAuth'
import BaseLayout from '../layouts/BaseLayout'
import TabLayout from '../layouts/TabLayout'

const Login = React.lazy(() => import('@@/src/pages/Login'))
const PageError = React.lazy(() => import('@components/Exceptions/Error404'))

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/*',
    element: (
      <RequireAuth>
        <SiderLayout>
          <TabLayout />
        </SiderLayout>
      </RequireAuth>
    ),
    errorElement: <PageError />,
  },
  {
    path: '*',
    element: <PageError />,
  },
])
export default router
