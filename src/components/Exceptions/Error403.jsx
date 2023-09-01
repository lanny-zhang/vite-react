import React from 'react'
import { Button, Result } from 'antd'

const Error403 = () => (
  <Result
    status='403'
    title='403'
    subTitle='Sorry, you are not authorized to access this page.'
  />
)
export default Error403
