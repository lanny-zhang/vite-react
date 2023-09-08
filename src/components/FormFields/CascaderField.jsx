import React from 'react'
import { Cascader } from 'antd'
import Field from './Field'

const CascaderField = (props) => {
  const {
    required, label, fieldProps, readOnly, options = [], disabledKeys, ...reset
  } = props

  return (
    <Field
      label={label}
      readOnly={readOnly}
      required={required}
      rules={[
        {
          type: 'array',
          required: !!required,
          message: `Please select ${label}`,
        },
      ]}
      {...reset}
    >
      <Cascader
        options={options}
        placeholder={`Please select ${label}`}
        allowClear
        autoComplete='off'
        {...fieldProps}
      />
    </Field>
  )
}

export default CascaderField
