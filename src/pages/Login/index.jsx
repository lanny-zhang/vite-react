/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate, useLocation } from 'react-router-dom'
import React from 'react'
import {
  Button, Typography, Form, Input,
} from 'antd'
import useAuth from '@@/src/hooks/auth'
import styles from './index.module.less'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const auth = useAuth()

  const from = location.state?.from?.pathname || '/'

  function handleSubmit(values) {
    auth.signin(values.username, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true })
    })
  }

  return (
    <div className={styles.login}>
      <div className={styles['login-form']}>
        <div className={styles['form-title']}>
          <Typography.Title level={1} style={{ margin: 0 }}>
            LOGIN
          </Typography.Title>
        </div>
        <Form
          name='basic'
          colon={false}
          requiredMark={false}
          labelCol={{
            span: 0,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            width: '100%',
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          autoComplete='off'
        >
          <Form.Item
            label=''
            name='username'
            rules={[
              {
                required: true,
                message: ' ',
              },
            ]}
          >
            <Input placeholder='Username' />
          </Form.Item>

          <Form.Item
            label=''
            name='password'
            rules={[
              {
                required: true,
                message: ' ',
              },
            ]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 7,
              span: 16,
            }}
          >
            <Button
              loading={auth.loading}
              style={{ width: '70%', marginTop: 12 }}
              type='primary'
              htmlType='submit'
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
