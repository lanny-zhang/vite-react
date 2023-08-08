import React, {
  useState, cloneElement, useEffect, useContext,
} from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Layout, Menu, theme as antdTheme } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { ctx } from '@/context'
import Header from '../Header'
import styles from './index.module.less'

const { Content, Sider } = Layout
const { useToken } = antdTheme

const menus = [
  {
    key: 'sub1',
    icon: <UserOutlined />,
    label: 'subnav 1',
    children: [
      {
        key: '/form',
        label: '表单',
      },
      {
        key: '/table',
        label: '表格',
      },
      {
        key: '/calender',
        label: '日历',
      },
    ],
  },
]

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

  const handleMenuChange = ({ key, domEvent }) => {
    domEvent.stopPropagation()
    navigate(key)
  }

  return (
    <Layout data-theme={theme} className={styles.siderlayout}>
      <Header />
      <Layout className={styles['siderlayout-center']}>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode='inline'
            onClick={handleMenuChange}
            selectedKeys={[activeTab]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={menus}
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
