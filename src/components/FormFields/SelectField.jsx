import React from 'react'
import { Select as AntSelect } from 'antd'
import Field from './Field'

export const Select = (props) => {
  const {
    options = [], disabledKeys = [], placeholder, ...reset
  } = props

  return (
    <AntSelect placeholder={placeholder} {...reset}>
      {options.map((items) => {
        const { label, value } = items

        return (
          <AntSelect.Option
            disabled={disabledKeys.some((key) => key === value)}
            key={value}
            value={value}
          >
            {label}
          </AntSelect.Option>
        )
      })}
    </AntSelect>
  )
}

const SelectField = (props) => {
  const {
    label, fieldProps, readOnly, options, disabledKeys, ...reset
  } = props

  return (
    <Field label={label} readOnly={readOnly} {...reset}>
      <Select
        options={options}
        placeholder={`Please select ${label}`}
        allowClear
        autoComplete='off'
        {...fieldProps}
      />
    </Field>
  )
}

export default SelectField
