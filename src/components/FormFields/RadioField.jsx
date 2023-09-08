import React from 'react'
import { Radio as AntRadion } from 'antd'
import Field from './Field'

export const Radio = (props) => {
  const { options = [], ...reset } = props
  return (
    <AntRadion.Group {...reset}>
      {options.map((item) => {
        const { label, value } = item
        return (
          <AntRadion key={value} value={value}>
            {label || value}
          </AntRadion>
        )
      })}
    </AntRadion.Group>
  )
}

const RadioField = (props) => {
  const {
    label, fieldProps, readOnly, options, ...reset
  } = props

  return (
    <Field label={label} readOnly={readOnly} {...reset}>
      <Radio options={options} {...fieldProps} />
    </Field>
  )
}

export default RadioField
