import React from 'react'
import { Space, Spin } from 'antd'

const LoadingPage = () => (
  <div
    style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Spin size='large' />
  </div>
)

export default LoadingPage
