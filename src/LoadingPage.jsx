import React from 'react'
import { Spin, theme as antdTheme } from 'antd'

const { useToken } = antdTheme

const LoadingPage = () => {
  const {
    token: { colorBgContainer },
  } = useToken()

  return (
    <div
      style={{
        minHeight: '800px',
        width: '100%',
        background: colorBgContainer,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin size='large' />
    </div>
  )
}

export default LoadingPage
