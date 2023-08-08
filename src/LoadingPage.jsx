import React from 'react'
import { Space, Spin } from 'antd'

const LoadingPage = () => (
  <div
    style={{
      minHeight: '800px',
      width: '100%',
      background: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Spin size='large' />
  </div>
)

export default LoadingPage
