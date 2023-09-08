import React from 'react'
import { Input } from 'antd'
import Field from './Field'

const TextAreaField = (props) => {
  const {
    label, fieldProps, readOnly, ...reset
  } = props

  return (
    <Field label={label} readOnly={readOnly} {...reset}>
      <Input.TextArea
        placeholder={`Please input ${label}`}
        showCount
        rows={4}
        allowClear
        {...fieldProps}
      />
    </Field>
  )
}

export default TextAreaField
