import React, {
  useState, cloneElement, useEffect, useContext,
} from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Layout, Menu, theme as antdTheme } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { ctx } from '@/context'
import { flattenRoutes } from '@@/src/router/routes'
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
        key: '/',
        label: 'home',
      },
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

  const [activePage, setActivePage] = useState({})
  const [pageList, setPageList] = useState([])

  const listenLocationChangeTabState = () => {
    const { pathname } = location
    const currentRouteObj = flattenRoutes.find((i) => i.path === pathname) || {}
    const { path, father } = currentRouteObj

    // 使用最高一级路由的path当作唯一标识
    const activeKey = father?.split('_')[0] || path

    const activePageObj = { ...currentRouteObj, key: activeKey }
    setActivePage(activePageObj)

    const isExistTab = pageList.some((i) => i.key === activeKey)
    if (!isExistTab) {
      setPageList([...pageList, activePageObj])
    } else {
      const tab = pageList.map((t) => {
        if (t.key === activeKey) {
          return activePageObj
        }
        return t
      })
      setPageList(tab)
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
            selectedKeys={[activePage?.key]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={menus}
          />
        </Sider>
        {children ? (
          cloneElement(children, {
            pageList,
            activePage,
            onChange(tab) {
              setActivePage(tab)
              navigate(tab.path)
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
