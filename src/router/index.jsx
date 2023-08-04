import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BaseLayout from '@@/src/layouts/BaseLayout'
import SiderLayout from '../layouts/SiderLayout'
import RequireAuth from './RequireAuth'
import TabLayout from '../layouts/TabLayout'

const Home = React.lazy(() => import('@@/src/pages/Home'))
const Login = React.lazy(() => import('@@/src/pages/Login'))
const PageOne = React.lazy(() => import('@pages/PageOne'))
const PageTwo = React.lazy(() => import('@pages/PageTwo'))
const PageError = React.lazy(() => import('./Exceptions/Error404'))

const RenderRoutes = () => (
  <Routes>
    <Route path='/login' element={<Login />} />
    <Route
      path='/'
      errorElement={<PageError />}
      element={(
        <RequireAuth>
          <SiderLayout>
            <TabLayout />
          </SiderLayout>
        </RequireAuth>
      )}
    >
      <Route index element={<Home />} />
      <Route path='/pageOne' element={<PageOne />} />
      <Route path='/PageTwo' element={<PageTwo />} />
    </Route>
  </Routes>
)

export default RenderRoutes
