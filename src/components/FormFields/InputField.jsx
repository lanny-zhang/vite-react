import React from 'react'
import { Input } from 'antd'
import Field from './Field'

const InputField = (props) => {
  const {
    label, fieldProps, readOnly, ...reset
  } = props

  return (
    <Field label={label} readOnly={readOnly} {...reset}>
      <Input allowClear placeholder={`Please input ${label}`} {...fieldProps} />
    </Field>
  )
}

export default InputField
