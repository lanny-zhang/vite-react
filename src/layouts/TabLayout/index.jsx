import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core'
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React, { useMemo } from 'react'
import { parsePath, createPath } from 'history'
import { Route, Routes } from 'react-router-dom'
import { isString } from 'lodash'
import routes from '@@/src/router/routes'
import Tabs, { TabPanel } from './components/Tabs'
import styles from './index.module.less'

const normalizeToLocationCache = {}

export const normalizeToLocation = (path) => {
  if (isString(path)) {
    if (normalizeToLocationCache[path]) {
      return normalizeToLocationCache[path]
    }
    const result = parsePath(path)
    normalizeToLocationCache[path] = result
    return result
  }
  return path
}

const TabLayout = ({ tabList, activeTab, onChange }) => {
  return (
    <>
      <Tabs value={activeTab} onChange={onChange} className={styles.tablayout}>
        {tabList.map((path) => {
          const { component: Component } = routes.find((i) => i?.path === path)
          return (
            <TabPanel value={path} label={`tab ${path}`} key={path}>
              <Routes location={normalizeToLocation(path)}>
                <Route path={path} key={path} element={<Component />} />
              </Routes>
            </TabPanel>
          )
        })}
        {/* <Routes location={normalizeToLocation(activeTab)}>
          {tabList.map((path) => {
            return (
              <Route
                key={path}
                path={path}
                label={`tab ${path}`}
                element={(
                  <TabPanel value={path} label={`tab ${path}`} key={path}>
                    {path}
                  </TabPanel>
                )}
              />
            )
          })}
        </Routes> */}
      </Tabs>
    </>
  )
}
export default TabLayout
