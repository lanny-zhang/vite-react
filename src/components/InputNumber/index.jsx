import React from 'react'
import { Input } from 'antd'

export default function InputNumber(props) {
  const { onChange, value, ...otherProps } = props

  const handleChange = (e) => {
    const { value: _value = '' } = e.target
    const num = /^[0-9]*$/.test(_value)
    if (num) {
      onChange(_value)
    }
  }

  return (
    <Input
      onChange={handleChange}
      autocomplete='new-password'
      allowClear
      value={value}
      {...otherProps}
    />
  )
}
