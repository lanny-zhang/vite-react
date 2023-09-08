import React from 'react'
import { Radio as AntRadion } from 'antd'
import Field from './Field'

export const Radio = (props) => {
  const { options = [], type, ...reset } = props
  const RadioOption = type === 'button' ? AntRadion.Button : AntRadion

  return (
    <AntRadion.Group {...reset}>
      {options.map((item) => {
        const { label, value } = item
        return (
          <RadioOption key={value} value={value}>
            {label || value}
          </RadioOption>
        )
      })}
    </AntRadion.Group>
  )
}

const RadioField = (props) => {
  const {
    label, fieldProps, readOnly, options, type = 'radio', ...reset
  } = props

  return (
    <Field label={label} readOnly={readOnly} {...reset}>
      <Radio type={type} options={options} {...fieldProps} />
    </Field>
  )
}

export default RadioField
