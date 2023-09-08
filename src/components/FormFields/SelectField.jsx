import React from 'react'
import { Select as AntSelect } from 'antd'
import Field from './Field'

export const Select = (props) => {
  const {
    options, label, disabledKeys, placeholder, ...reset
  } = props
  let selectItem = options
  let checkIsObject = false

  if (!(options instanceof Array) && options instanceof Object) checkIsObject = true
  if (checkIsObject) selectItem = options.item || []

  const disableCheck = (list = [], value) => list.some((key) => key === value)
  return (
    <AntSelect placeholder={placeholder} {...reset}>
      {selectItem &&
        selectItem.length > 0 &&
        selectItem.map((items, index) => {
          // eslint-disable-next-line no-shadow
          const { label, value } = items
          const keyValue = `${index}`
          return (
            <AntSelect.Option
              disabled={disableCheck(
                disabledKeys,
                checkIsObject ? items[options.value || 'value'] : value,
              )}
              key={keyValue}
              value={checkIsObject ? items[options.value || 'value'] : value}
            >
              {checkIsObject ? items[options.label || 'label'] : label}
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
