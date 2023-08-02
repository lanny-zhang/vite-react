import React, { useContext, useEffect } from 'react'
import { Button } from 'antd'
import { Outlet } from 'react-router-dom'
import { ctx } from '@/context'
import styles from './index.module.less'

const BaseLayout = () => {
  const { setTheme, theme } = useContext(ctx)

  function handleSwitchTheme() {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <div data-theme={theme} className={styles['base-layout-wrap']}>
      <header>
        <Button onClick={handleSwitchTheme}>switch theme</Button>
      </header>
      <div>
        <Outlet />
      </div>
      <footer>footer</footer>
    </div>
  )
}

export default BaseLayout
