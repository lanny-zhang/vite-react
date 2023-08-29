import React, { useContext } from 'react'
import { SkinOutlined } from '@ant-design/icons'
import {
  Layout, Menu, theme as antdTheme, Typography,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { ctx } from '@/context'
import styles from './index.module.less'

const { useToken } = antdTheme

const Header = ({ onChange, menus, selectedKey }) => {
  const navigate = useNavigate()
  const { setTheme, theme } = useContext(ctx)
  const {
    token: { colorBgContainer },
  } = useToken()

  const nav = menus.map((i) => {
    const { children, ...reset } = i
    return reset
  })

  function handleSwitchTheme() {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  return (
    <Layout.Header className={styles.header}>
      <div className={styles['header-logo']}>
        <Typography.Title
          onClick={() => {
            navigate('/')
          }}
          level={5}
          style={{ margin: 0, cursor: 'pointer' }}
        >
          LOGO
        </Typography.Title>
      </div>
      <Menu
        style={{ width: '100%' }}
        onClick={onChange}
        className={styles['header-menu']}
        // theme='dark'
        mode='horizontal'
        selectedKeys={[selectedKey]}
        items={nav}
      />
      <div className={styles['header-right']}>
        <SkinOutlined onClick={handleSwitchTheme} style={{ color: '#999', fontSize: 18 }} />
      </div>
    </Layout.Header>
  )
}

export default Header
