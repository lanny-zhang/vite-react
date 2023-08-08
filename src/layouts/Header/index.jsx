import React, { useContext } from 'react'
import { SkinOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { ctx } from '@/context'
import styles from './index.module.less'

const items1 = ['nav'].map((key, index) => ({
  key,
  name: key,
  label: `nav ${index + 1}`,
}))

const Header = ({ onChange }) => {
  const { setTheme, theme } = useContext(ctx)

  function handleSwitchTheme() {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  return (
    <Layout.Header className={styles.header}>
      <div className={styles['header-logo']} />
      <Menu
        style={{ width: '100%' }}
        onClick={onChange}
        theme='dark'
        mode='horizontal'
        selectedKeys={['nav']}
        items={items1}
      />
      <div className={styles['header-right']}>
        <SkinOutlined onClick={handleSwitchTheme} style={{ color: '#999', fontSize: 18 }} />
      </div>
    </Layout.Header>
  )
}

export default Header
