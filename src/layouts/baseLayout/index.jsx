import React, { useContext, useEffect } from 'react'
import { Button } from 'antd'
import { Outlet } from 'react-router-dom'
import { ctx } from '@/context'
import styles from './index.module.less'

const BaseLayout = (props) => {
  const { history } = props
  const { setTheme, theme } = useContext(ctx)

  useEffect(() => {
    // 这里可以进行登录拦截
    const isLogin = true
    if (!isLogin) {
      history.push('/login')
    }
  }, [])

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
