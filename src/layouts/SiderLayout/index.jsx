import React, { useState, useEffect, useContext } from 'react'
import { InsertRowAboveOutlined, FormOutlined, FileExclamationOutlined } from '@ant-design/icons'
import { Layout, Menu, theme as antdTheme } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { isEmpty } from 'lodash'
import classname from 'classname'
import { ctx } from '@/context'
import { flattenRoutes } from '@@/src/router/routes'
import BasicContent from './components/BasicContent'
import TabContent from './components/TabContent'
import Header from '../Header'
import styles from './index.module.less'

const { Sider } = Layout
const { useToken } = antdTheme

const menus = [
  {
    key: '/basic',
    label: 'Basic',
    children: [
      {
        key: '/basic/form',
        icon: <FormOutlined />,
        label: 'Form',
        children: [
          {
            key: '/basic/form/basic-form',
            label: 'Basic Form',
          },
        ],
      },
      {
        key: '/basic/table',
        icon: <InsertRowAboveOutlined />,
        label: 'Table',
        children: [
          {
            key: '/basic/table/basic-table',
            label: 'Basic Table',
          },
          {
            key: '/basic/table/search-table',
            label: 'Search Table',
          },
        ],
      },
      {
        key: '/basic/exception',
        icon: <FileExclamationOutlined />,
        label: 'Exception',
        children: [
          {
            key: '/basic/exception/404',
            label: '404',
          },
          {
            key: '/basic/exception/403',
            label: '403',
          },
          {
            key: '/basic/exception/500',
            label: '500',
          },
        ],
      },
    ],
  },
  {
    key: '/graphic',
    label: 'Graphic Editor',
    children: [
      {
        key: '/graphic/flow-editor',
        icon: <InsertRowAboveOutlined />,
        label: 'Flow Editor',
      },
    ],
  },
]

const SiderLayout = ({ mode }) => {
  const { theme } = useContext(ctx)
  const {
    token: { colorBgContainer },
  } = useToken()

  const navigate = useNavigate()
  const location = useLocation()

  const [activePage, setActivePage] = useState({})
  const [pageList, setPageList] = useState([])
  const [menuOpenKeys, setMenuOpenKeys] = useState([])
  const [selectedHeaderMenu, setSelectedHeaderMenu] = useState('')
  // 每一个header菜单下对应的默认显示的页面
  const [headerDefaultPage, setHeaderDefaultPage] = useState({})

  const handleHeaderDefaultPage = () => {
    const { pathname, search } = location
    const headerPath = `/${pathname.split('/')[1]}`
    // setMenuOpenKeys(pathname);
    setHeaderDefaultPage({ ...headerDefaultPage, [`${headerPath}`]: pathname + search })
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
    mode === 'tab' && maintainTabState()
    // 切换header时默认显示页面的处理
    handleHeaderDefaultPage()
  }, [location])

  const handleMenuChange = ({ key }) => {
    if (mode === 'tab') {
      const existTab = pageList.find((i) => i.key === key)
      if (existTab) navigate(existTab.path)
      else navigate(key)
    } else {
      navigate(key)
      setActivePage({ key })
    }
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
            onOpenChange={(keys) => {
              setMenuOpenKeys(keys)
            }}
            mode='inline'
            openKeys={menuOpenKeys}
            onClick={handleMenuChange}
            selectedKeys={[activePage?.key]}
            defaultOpenKeys={['/basic/general']}
            style={{ height: '100%', borderRight: 0 }}
            items={menus.find((i) => i.key === selectedHeaderMenu)?.children}
          />
        </Sider>
        {mode === 'tab' ? (
          <TabContent
            pageList={pageList}
            activePage={activePage}
            onDeletePage={handleDeletePage}
            onChange={(tab) => {
              setActivePage(tab)
              navigate(tab.path)
            }}
          />
        ) : (
          <BasicContent />
        )}
      </Layout>
    </Layout>
  )
}

export default SiderLayout
