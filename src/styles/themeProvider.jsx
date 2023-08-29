import { ConfigProvider, theme } from 'antd'
import React, { useContext } from 'react'
import { ctx } from '@/context'

const ThemeProvider = ({ children }) => {
  const { theme: contextTheme } = useContext(ctx)
  return (
    <ConfigProvider
      // componentSize='small'
      wave={{ disabled: true }}
      theme={{
        algorithm: contextTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
        token: {
          'colorPrimary': '#5ea1ff',
          'colorError': '#ff6669',
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default ThemeProvider
