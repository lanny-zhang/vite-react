import React, {
  useState, cloneElement, useEffect, useContext,
} from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Layout, Menu, theme as antdTheme } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { isEmpty } from 'lodash'
import classname from 'classname'
import { ctx } from '@/context'
import { flattenRoutes } from '@@/src/router/routes'
import Header from '../Header'
import styles from './index.module.less'

const { Content, Sider } = Layout
const { useToken } = antdTheme

const menus = [
  {
    key: 'basic',
    label: 'Basic Components',
    children: [
      {
        key: 'sub1',
        icon: <UserOutlined />,
        label: 'General',
        children: [
          {
            key: '/basic/form',
            label: 'Form',
          },
          {
            key: '/basic/table',
            label: 'Table',
          },
          {
            key: '/basic/calender',
            label: 'Calender',
          },
        ],
      },
      {
        key: '/basic/descriptions',
        label: 'Descriptions',
      },
    ],
  },
  {
    key: 'complex',
    label: 'Complex Components',
    children: [
      {
        key: 'graphic',
        icon: <UserOutlined />,
        label: 'Graphic Editor',
        children: [
          {
            key: '/complex/flow',
            label: 'Flow Editor',
          },
        ],
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
  const [selectedHeaderMenu, setSelectedHeaderMenu] = useState('basic')
  // 每一个header菜单下对应的默认显示的页面
  const [headerDefaultPage, setHeaderDefaultPage] = useState({})

  const handleHeaderDefaultPage = () => {
    const { pathname } = location
    const headerPath = pathname.split('/')[1]
    setHeaderDefaultPage({ ...headerDefaultPage, [headerPath]: pathname })
    setSelectedHeaderMenu(headerPath)
  }

  const maintainTabState = () => {
    const { pathname, search } = location
    const currentRouteObj = flattenRoutes.find((i) => i.path === pathname) || {}
    const { path, father } = currentRouteObj
    // 使用最高一级路由的path当作唯一标识
    const activeKey = father?.split('_')[0] || path

    const activePageObj = {
      ...currentRouteObj,
      key: activeKey,
      path: path + search,
    }
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
    // tab页列表的维护和显示
    maintainTabState()
    // 切换header时默认显示页面的处理
    handleHeaderDefaultPage()
  }, [location])

  const handleMenuChange = ({ key, domEvent }) => {
    domEvent.stopPropagation()

    const existTab = pageList.find((i) => i.key === key)
    if (existTab) navigate(existTab.path)
    else navigate(key)
  }

  const handleDeletePage = (currentPages) => {
    setPageList(currentPages)
    navigate(isEmpty(currentPages) ? '/' : currentPages[0].path)
  }

  // 切换头部导航时候要切换到该导航下的页面
  const handleHeaderMenuChange = ({ key }) => {
    if (headerDefaultPage[key]) {
      navigate(headerDefaultPage[key])
    } else {
      const correspondSiderMenus = menus.find((i) => i.key === key).children
      const currentPage = correspondSiderMenus[0]?.children
        ? correspondSiderMenus[0].children[0].key
        : correspondSiderMenus[0].key
      navigate(currentPage)
    }
  }

  return (
    <Layout data-theme={theme} className={styles.siderlayout}>
      <Header selectedKey={selectedHeaderMenu} menus={menus} onChange={handleHeaderMenuChange} />
      <Layout className={styles['siderlayout-center']}>
        <Sider
          className={classname(styles.sider, {
            [styles['sider-hide']]: activePage.hideSider,
          })}
          width={200}
          style={{ background: colorBgContainer }}
        >
          <Menu
            mode='inline'
            onClick={handleMenuChange}
            selectedKeys={[activePage?.key]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={menus.find((i) => i.key === selectedHeaderMenu).children}
          />
        </Sider>
        {children ? (
          cloneElement(children, {
            pageList,
            activePage,
            onDeletePage: handleDeletePage,
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
