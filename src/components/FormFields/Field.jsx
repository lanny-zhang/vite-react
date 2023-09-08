import React from 'react'
import { Form } from 'antd'

const Field = (props) => {
  const {
    name,
    label,
    rules,
    required,
    message = `Please enter ${label}`,
    initialValue,
    labelCol,
    wrapperCol,
    children,
    ...reset
  } = props

  return (
    <Form.Item
      name={name}
      label={label}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      required={!!required}
      initialValue={initialValue}
      rules={[{ required: !!required, message, ...rules }]}
      {...reset}
    >
      {children}
    </Form.Item>
  )
}

export default Field
