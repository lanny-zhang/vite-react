import React from 'react'
import { Input } from 'antd'
import Field from './Field'

const InputField = (props) => {
  const {
    label, fieldProps, readOnly, required, message, ...reset
  } = props

  return (
    <Field
      label={label}
      readOnly={readOnly}
      required={required}
      rules={[{ required: !!required, message, whitespace: true }]}
      {...reset}
    >
      <Input allowClear placeholder={`Please input ${label}`} {...fieldProps} />
    </Field>
  )
}

export default InputField
