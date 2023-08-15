import React, { Suspense } from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import { cloneDeep, isEmpty } from 'lodash'
import { Tabs } from 'antd'
import classname from 'classname'
import routes from '@@/src/router/routes'
import LoadingPage from '@@/src/LoadingPage'
import { flattenArray } from '@@/src/util/javascript'
import Breadcrumb from '@@/src/components/Breadcrumb'
import styles from './index.module.less'

const TabLayout = ({
  pageList, activePage, onChange, onDeletePage,
}) => {
  const items = pageList.map(({ path, key }) => {
    // 找到当前路由的对应路由和子路由，并展开
    const route = routes.find((i) => `/${i.path}` === key)
    const flattenRoute = flattenArray([route])
    return {
      label: route?.title,
      key,
      children: (
        <div className={styles['route-wrap']}>
          <Breadcrumb route={route} currentPath={path} />
          <div className={styles['route-content']}>
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
          </div>
        </div>
      ),
    }
  })

  const handleDeletePage = (pageKey) => {
    const deletedPageList = cloneDeep(pageList).filter((i) => i.key !== pageKey)
    onDeletePage(deletedPageList)
  }

  return (
    <>
      {isEmpty(pageList) ? (
        <Outlet />
      ) : (
        <Tabs
          hideAdd
          className={classname(styles.tablayout, {
            [styles.hideTab]: activePage?.hideTab,
          })}
          size='small'
          onEdit={handleDeletePage}
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
