import React, { Suspense } from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import { isEmpty } from 'lodash'
import routes from '@@/src/router/routes'
import LoadingPage from '@@/src/LoadingPage'
import Tabs, { TabPanel } from './components/Tabs'
import styles from './index.module.less'

const TabLayout = ({ tabList, activeTab, onChange }) => {
  return (
    <>
      {isEmpty(tabList) ? (
        <Outlet />
      ) : (
        <Tabs value={activeTab} onChange={onChange} className={styles.tablayout}>
          {tabList.map((path) => {
            const { element, title } = routes.find((i) => i?.path === path)
            return (
              <TabPanel value={path} label={title} key={path}>
                <Routes location={path}>
                  <Route
                    index
                    path={path}
                    key={path}
                    element={<Suspense fallback={<LoadingPage />}>{element}</Suspense>}
                  />
                </Routes>
              </TabPanel>
            )
          })}
        </Tabs>
      )}
    </>
  )
}

export default TabLayout
