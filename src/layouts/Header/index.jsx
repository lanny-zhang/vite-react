import React from 'react'
import { SkinOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import styles from './index.module.less'

const items1 = ['/pageOne', '/pageTwo'].map((key) => ({
  key,
  name: key,
  label: `nav ${key}`,
}))

const Header = ({ onChange }) => {
  return (
    <Layout.Header className={styles.header}>
      <div className={styles['header-logo']} />
      <Menu
        style={{ width: '100%' }}
        onClick={onChange}
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['pageOne']}
        items={items1}
      />
      <div className={styles['header-right']}>
        <SkinOutlined style={{ color: '#fff', fontSize: 20 }} />
      </div>
    </Layout.Header>
  )
}

export default Header
