import React from 'react'
import Number from '@/components/InputNumber'
import Field from './Field'

const NumberField = (props) => {
  const {
    label, fieldProps, readOnly, ...reset
  } = props

  return (
    <Field label={label} readOnly={readOnly} {...reset}>
      <Number
        style={{ width: '100%' }}
        allowClear
        placeholder={`Please input ${label}`}
        {...fieldProps}
      />
    </Field>
  )
}

export default NumberField
