import React from 'react'
import { Input } from 'antd'
import Field from './Field'

const TextAreaField = (props) => {
  const {
    label, fieldProps, readOnly, required, message, ...reset
  } = props

  return (
    <Field label={label} readOnly={readOnly} {...reset}>
      <Input.TextArea
        placeholder={`Please input ${label}`}
        showCount
        rules={[{ required: !!required, message, whitespace: true }]}
        rows={4}
        allowClear
        {...fieldProps}
      />
    </Field>
  )
}

export default TextAreaField
