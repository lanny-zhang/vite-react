import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'antd'
import { testRequest } from './services'
import styles from './index.module.less'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    testRequest()
  }, [])

  function goPage() {
    navigate('/pageOne')
  }

  return (
    <div className={styles.home}>
      Hello World
      <br />
      <Card title='Default size card' extra='More' style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Button type='primary' onClick={goPage}>
        路由跳转
      </Button>
    </div>
  )
}

export default Home
