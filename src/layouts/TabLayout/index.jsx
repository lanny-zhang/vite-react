import React, { Suspense } from 'react'
import {
  Route, Routes, Outlet, useLocation,
} from 'react-router-dom'
import { isEmpty } from 'lodash'
import { Tabs } from 'antd'
import routes from '@@/src/router/routes'
import LoadingPage from '@@/src/LoadingPage'
import { flattenArray, flattenArray1 } from '@@/src/util/javascript'
import styles from './index.module.less'

const TabLayout = ({ tabList, activeTab, onChange }) => {
  const location = useLocation()

  const items = tabList.map((path) => {
    // 找到当前路由的对应路由和子路由，并展开
    const route = routes.find((i) => `/${i.path}` === path)
    const a = flattenArray1(routes)
    const flattenRoute = flattenArray([route])
    // 与当前浏览器的路由进行匹配，匹配的上就采用当前浏览器的路由，匹配不上用list中的路由
    const currentActiveTabRoute = flattenRoute.find((i) => `/${i.path}` === location.pathname)
    const currentActiveTabPath = currentActiveTabRoute?.path
      ? `/${currentActiveTabRoute.path}`
      : path

    console.log({
      activeTab,
      path,
      currentActiveTabRoute,
      currentActiveTabPath,
      a,
      flattenRoute,
    })
    return {
      label: route?.title,
      key: path,
      children: (
        <Routes location={currentActiveTabPath}>
          {flattenRoute.map((item) => {
            const { element, path: p } = item
            return (
              <Route
                path={p}
                key={p}
                element={<Suspense fallback={<LoadingPage />}>{element}</Suspense>}
              />
            )
          })}
        </Routes>
      ),
    }
  })

  return (
    <>
      {isEmpty(tabList) ? (
        <Outlet />
      ) : (
        <Tabs
          hideAdd
          className={styles.tablayout}
          onChange={onChange}
          type='editable-card'
          activeKey={activeTab}
          items={items}
        />
      )}
    </>
  )
}

export default TabLayout
