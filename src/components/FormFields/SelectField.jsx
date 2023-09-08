import React from 'react'
import { Select } from 'antd'
import Field from './Field'

const SelectField = (props) => {
  const {
    label, fieldProps, readOnly, options, disabledKeys, ...reset
  } = props

  let selectItem = options
  let checkIsObject = false

  if (!(options instanceof Array) && options instanceof Object) checkIsObject = true
  if (checkIsObject) selectItem = options.item || []

  const disableCheck = (list = [], value) => list.some((key) => key === value)

  return (
    <Field label={label} readOnly={readOnly} {...reset}>
      <Select placeholder={`Please select ${label}`} allowClear autoComplete='off' {...fieldProps}>
        {selectItem &&
          selectItem.length > 0 &&
          selectItem.map((items, index) => {
            // eslint-disable-next-line no-shadow
            const { label, value } = items
            const keyValue = `${index}`
            return (
              <Select.Option
                disabled={disableCheck(
                  disabledKeys,
                  checkIsObject ? items[options.value || 'value'] : value,
                )}
                key={keyValue}
                value={checkIsObject ? items[options.value || 'value'] : value}
              >
                {checkIsObject ? items[options.label || 'label'] : label}
              </Select.Option>
            )
          })}
      </Select>
    </Field>
  )
}

export default SelectField
