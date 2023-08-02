import { ConfigProvider, theme } from 'antd'
import React, { useContext } from 'react'
import { ctx } from '@/context'

const ThemeProvider = ({ children }) => {
  const { theme: contextTheme } = useContext(ctx)
  return (
    <ConfigProvider
      theme={{
        algorithm: contextTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default ThemeProvider
