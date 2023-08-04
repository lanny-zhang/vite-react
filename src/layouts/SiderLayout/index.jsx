import React, { useState, cloneElement } from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './index.module.less'

const { Header, Content, Sider } = Layout

const items1 = ['/pageOne', '/pageTwo'].map((key) => ({
  key,
  name: key,
  label: `nav ${key}`,
}))

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1)

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1
      return {
        key: subKey,
        label: `option${subKey}`,
      }
    }),
  }
})

const SiderLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState([])
  const [tabList, setTabList] = useState([])

  const handleTopMenuChange = ({ key, domEvent }) => {
    domEvent.stopPropagation()
    setActiveTab(key)
    setTabList([...tabList, key])
    navigate(key)
  }

  return (
    <Layout className={styles.siderlayout}>
      <Header className={styles['siderlayout-header']}>
        <div className={styles['header-logo']} />
        <Menu
          style={{ width: '100%' }}
          onClick={handleTopMenuChange}
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['pageOne']}
          items={items1}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        {children ? (
          cloneElement(children, {
            tabList,
            activeTab,
            onChange(path) {
              setActiveTab(path)
              navigate(path)
            },
          })
        ) : (
          <Layout className={styles['siderlayout-content-wrap']}>
            <Content
              className={styles['siderlayout-content']}
              style={{
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        )}
      </Layout>
    </Layout>
  )
}

export default SiderLayout
