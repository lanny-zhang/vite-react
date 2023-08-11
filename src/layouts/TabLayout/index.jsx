import React, { Suspense } from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { Tabs } from 'antd'
import classname from 'classname'
import routes from '@@/src/router/routes'
import LoadingPage from '@@/src/LoadingPage'
import { flattenArray } from '@@/src/util/javascript'
import styles from './index.module.less'

const TabLayout = ({ pageList, activePage, onChange }) => {
  const items = pageList.map(({ path, key }) => {
    // 找到当前路由的对应路由和子路由，并展开
    const route = routes.find((i) => `/${i.path}` === key)
    const flattenRoute = flattenArray([route])
    return {
      label: route?.title,
      key,
      children: (
        <Routes location={path}>
          {flattenRoute.map((item) => {
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
      ),
    }
  })

  return (
    <>
      {isEmpty(pageList) ? (
        <Outlet />
      ) : (
        <Tabs
          hideAdd
          className={classname(styles.tablayout, {
            [styles.hidenTab]: activePage?.hidenTab,
          })}
          onChange={(activeKey) => {
            const tab = pageList.find((i) => i.key === activeKey)
            onChange(tab)
          }}
          type='editable-card'
          activeKey={activePage?.key}
          items={items}
        />
      )}
    </>
  )
}

export default TabLayout
