import React from 'react'
import { DatePicker } from 'antd'
import Field from './Field'

const RangePickerField = (props) => {
  const {
    label, fieldProps, readOnly, ...reset
  } = props

  return (
    <Field label={label} readOnly={readOnly} {...reset}>
      <DatePicker.RangePicker
        format='DD-MM-YYYY'
        placeholder={['Start Time', 'End Time']}
        allowClear
        {...fieldProps}
      />
    </Field>
  )
}

export default RangePickerField
