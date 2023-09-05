import React, { Suspense } from 'react'
import { Layout, theme } from 'antd'
import { Outlet, Routes, Route } from 'react-router-dom'
import LoadingPage from '@@/src/LoadingPage'
import { flattenRoutes } from '@@/src/router/routes'
import styles from '../index.module.less'

const { Content } = Layout

const BasicContent = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout className={styles['siderlayout-content-wrap']}>
      <Content
        className={styles['siderlayout-content']}
        style={{
          background: colorBgContainer,
        }}
      >
        <Routes>
          {flattenRoutes.map((item) => {
            const { element, path: p } = item
            return (
              <Route
                path={p.substring(1)}
                key={p}
                id={p}
                element={<Suspense fallback={<LoadingPage />}>{element}</Suspense>}
              />
            )
          })}
        </Routes>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default BasicContent
