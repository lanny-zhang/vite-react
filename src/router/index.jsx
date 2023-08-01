import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BaseLayout from '@@/src/layouts/BaseLayout'

const Home = React.lazy(() => import('@@/src/pages/Home'))
const Login = React.lazy(() => import('@@/src/pages/Login'))
const PageError = React.lazy(() => import('./Exceptions/Error404'))

const RenderRoutes = () => (
  <Routes>
    <Route path='/login' Component={Login} />
    <Route path='/' element={<BaseLayout />}>
      <Route path='/home' Component={Home} />
    </Route>
    <Route path='*' Component={PageError} />
  </Routes>
)

export default RenderRoutes
