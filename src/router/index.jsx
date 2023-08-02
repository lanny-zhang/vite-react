import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BaseLayout from '@@/src/layouts/BaseLayout'
import RequireAuth from './RequireAuth'

const Home = React.lazy(() => import('@@/src/pages/Home'))
const Login = React.lazy(() => import('@@/src/pages/Login'))
const PageError = React.lazy(() => import('./Exceptions/Error404'))

const RenderRoutes = () => (
  <Routes>
    <Route path='/'>
      <Route path='/login' element={<Login />} />
      <Route element={<BaseLayout />}>
        <Route
          index
          path='/home'
          element={(
            <RequireAuth>
              <Home />
            </RequireAuth>
          )}
        />
      </Route>
    </Route>
    <Route path='*' Component={PageError} />
  </Routes>
)

export default RenderRoutes
