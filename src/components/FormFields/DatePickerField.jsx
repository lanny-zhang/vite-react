import React from 'react'
import { DatePicker } from 'antd'
import Field from './Field'

const DatePickerField = (props) => {
  const {
    label, fieldProps, readOnly, ...reset
  } = props

  return (
    <Field label={label} readOnly={readOnly} {...reset}>
      <DatePicker
        format='DD-MM-YYYY'
        allowClear
        placeholder={`Please select ${label}`}
        {...fieldProps}
      />
    </Field>
  )
}

export default DatePickerField
