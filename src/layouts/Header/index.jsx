import React, { useContext, useState } from 'react'
import {
  Layout, Menu, Typography, Drawer, Form, Avatar, Dropdown,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import useAuth from '@@/src/hooks/auth'
import { ctx } from '@/context'
import { RadioField } from '@/components/FormFields'
import styles from './index.module.less'

const Header = ({ onChange, menus, selectedKey }) => {
  const navigate = useNavigate()
  const { setTheme, theme } = useContext(ctx)
  const auth = useAuth()

  const [open, setOpen] = useState(false)

  const items = [
    {
      key: '0',
      label: 'Admin',
      disabled: true,
    },
    {
      key: '2',
      label: 'SETTING',
      onClick() {
        showDrawer()
      },
    },
    {
      key: '1',
      label: 'SIGN OUT',
      onClick() {
        auth.signout()
      },
    },
  ]

  const nav = menus.map((i) => {
    const { children, ...reset } = i
    return reset
  })

  function handleSwitchTheme(e) {
    setTheme(e.target.value)
  }

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const handleLayout = (e) => {
    localStorage.setItem('layout', e.target.value)
    window.location.reload()
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
        <Dropdown arrow={false} menu={{ items }} placement='bottom'>
          <Avatar style={{ verticalAlign: 'middle' }}>a</Avatar>
        </Dropdown>
      </div>
      <Drawer closable={false} title='Setting' placement='right' onClose={onClose} open={open}>
        <Form
          initialValues={{ theme, layout: localStorage.getItem('layout') || 'tab' }}
          layout='vertical'
        >
          <RadioField
            name='theme'
            label='Theme'
            type='button'
            onChange={handleSwitchTheme}
            className={styles['radio-field']}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
            ]}
          />
          <RadioField
            name='layout'
            label='Layout'
            type='button'
            onChange={handleLayout}
            className={styles['radio-field']}
            options={[
              { value: 'tab', label: 'Tab' },
              { value: 'basic', label: 'Basic' },
            ]}
          />
        </Form>
      </Drawer>
    </Layout.Header>
  )
}

export default Header
