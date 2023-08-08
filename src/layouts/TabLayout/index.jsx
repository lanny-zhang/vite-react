import React, { Suspense } from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { Tabs } from 'antd'
import routes from '@@/src/router/routes'
import LoadingPage from '@@/src/LoadingPage'
import styles from './index.module.less'

const TabLayout = ({ tabList, activeTab, onChange }) => {
  const items = tabList.map((path) => {
    const { element, title } = routes.find((i) => i?.path === path)
    return {
      label: title,
      key: path,
      children: (
        <Routes location={path}>
          <Route
            index
            path={path}
            key={path}
            element={<Suspense fallback={<LoadingPage />}>{element}</Suspense>}
          />
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
