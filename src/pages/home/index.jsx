import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Space } from 'antd'
import useAuth from '@@/src/hooks/auth'
import PageLayout from '@@/src/components/PageLayout'
import { testRequest } from './services'
import styles from './index.module.less'

const Home = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  useEffect(() => {
    testRequest()
  }, [])

  function goPage() {
    navigate('/basic/general/table')
  }

  return (
    <PageLayout>
      <Typography.Title level={1} style={{ margin: 0 }}>
        HELLO WORLD
      </Typography.Title>
      <br />
      <Button type='primary' onClick={goPage}>
        LINK TO TABLE PAGE
      </Button>
    </PageLayout>
  )
}

export default Home
