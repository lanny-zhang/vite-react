import React, {
  useState, cloneElement, useEffect, useContext,
} from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu, theme as antdTheme } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { ctx } from '@/context'
import Header from '../Header'
import styles from './index.module.less'

const { Content, Sider } = Layout
const { useToken } = antdTheme

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
  const { theme } = useContext(ctx)
  const {
    token: { colorBgContainer },
  } = useToken()

  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState([])
  const [tabList, setTabList] = useState([])

  const listenLocationChangeTabState = () => {
    if (location.pathname === '/') {
      setActiveTab(null)
      setTabList([])
      return
    }
    setActiveTab(location.pathname)
    const isExistTab = tabList.some((i) => i === location.pathname)
    if (!isExistTab) {
      setTabList([...tabList, location.pathname])
    }
  }

  useEffect(() => {
    listenLocationChangeTabState()
  }, [location])

  const handleTopMenuChange = ({ key, domEvent }) => {
    domEvent.stopPropagation()
    navigate(key)
  }

  return (
    <Layout data-theme={theme} className={styles.siderlayout}>
      <Header selectedKeys={activeTab} onChange={handleTopMenuChange} />
      <Layout className={styles['siderlayout-center']}>
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
