import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { testRequest } from './services'
import styles from './index.module.less'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    testRequest()
  }, [])

  function goPage() {
    navigate('/login')
  }

  return (
    <div className={styles.home}>
      Hello World
      <br />
      <Button type='primary' onClick={goPage}>
        路由跳转
      </Button>
    </div>
  )
}

export default Home
