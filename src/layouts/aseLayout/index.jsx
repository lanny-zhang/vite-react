import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ctx } from '@/context'
import styles from './index.module.less'

const BaseLayout = () => {
  const { theme } = useContext(ctx)

  return (
    <div data-theme={theme} className={styles['base-layout-wrap']}>
      <Outlet />
    </div>
  )
}

export default BaseLayout
