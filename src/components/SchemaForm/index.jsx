/* eslint-disable max-len */
import React from 'react'
import classNames from 'classname'
import {
  Col, Input, InputNumber, Row, DatePicker, Form, Switch, Checkbox, Cascader,
} from 'antd'
import Number from '@/components/InputNumber'
import { Field } from '../FormFields'
import { Radio } from '../FormFields/RadioField'
import { Select } from '../FormFields/SelectField'
import styles from './index.module.less'

const SchemaForm = (props) => {
  const {
    jsonForm = [],
    col = { span: 24 },
    row = { gutter: { md: 4, lg: 6, xl: 12 } },
    disabled = false,
    staticTestUrl,
    form,
    children,
    ...otherProps
  } = props

  const [selfForm] = Form.useForm()

  /**
   *  formItemOpt object 全局antd表单组件原生选项
   *  formData array 生成表单内容数组 详见85行
   *  colOpt object 全局列栅格
   *  rowOpt object 全局行栅格
   *  staticTestUrl 用于UI测试的路径名
   */

  const getFormItem = ({
    type,
    component,
    componentProps,
    options = [],
    disabledKeys = [],
    name,
    label,
  }) => {
    const { className } = componentProps || {}
    let testClassName = {}
    if (name && staticTestUrl) testClassName = `${staticTestUrl}_${name}`
    const groupClassName = `${className} ${testClassName}`

    switch (type) {
      case 'input': // 输入框组件
        return (
          <Input
            disabled={disabled}
            placeholder={`Please input ${label}`}
            allowClear
            {...componentProps}
            className={groupClassName}
          />
        )
      case 'text-area': // 输入域组件
        return (
          <Input.TextArea
            disabled={disabled}
            placeholder={`Please input ${label}`}
            showCount
            rows={4}
            allowClear
            {...componentProps}
            className={groupClassName}
          />
        )
      case 'password': // 密码输入框组件
        return (
          <Input.Password
            disabled={disabled}
            placeholder={`Please input ${label}`}
            allowClear
            {...componentProps}
            className={groupClassName}
          />
        )
      case 'confirm-password':
        return (
          <Input.Password
            autocomplete='new-password'
            disabled={disabled}
            placeholder={`Please input ${label}`}
            allowClear
            {...componentProps}
            className={groupClassName}
          />
        )
      case 'input-code':
        return (
          <Number
            disabled={disabled}
            style={{ width: '100%' }}
            allowClear
            maxLength={6}
            placeholder={`Please input ${label}`}
            {...componentProps}
            className={groupClassName}
          />
        )
      case 'input-number': // 数字输入框组件
        return (
          <InputNumber
            disabled={disabled}
            style={{ width: '100%' }}
            allowClear
            placeholder={`Please input ${label}`}
            {...componentProps}
            className={groupClassName}
          />
        )
      case 'switch':
        return <Switch disabled={disabled} {...componentProps} className={groupClassName} />
      case 'date': // 日期组件
        return (
          <DatePicker
            disabled={disabled}
            format='DD-MM-YYYY'
            allowClear
            placeholder={`Please select ${label}`}
            {...componentProps}
            className={groupClassName}
          />
        )
      case 'rangeDate': // 日期组件
        return (
          <DatePicker.RangePicker
            disabled={disabled}
            format='DD-MM-YYYY'
            placeholder={['开始时间', '结束时间']}
            allowClear
            {...componentProps}
            className={groupClassName}
          />
        )
      case 'checkbox':
        return <Checkbox />
      case 'radio':
        return <Radio options={options} />
      case 'cascader':
        return (
          <Cascader
            disabled={disabled}
            placeholder={`Please select ${label}`}
            allowClear
            autoComplete='off'
            options={options}
            className={groupClassName}
            {...componentProps}
          />
        )
      case 'select': {
        return (
          <Select
            disabled={disabled}
            placeholder={`Please select ${label}`}
            allowClear
            autoComplete='off'
            options={options}
            disabledKeys={disabledKeys}
            {...componentProps}
            className={groupClassName}
          />
        )
      }
      default:
        return component
    }
  }

  const specialRules = {
    input: { whitespace: true },
    'text-area': { whitespace: true },
    cascader: { type: 'array' },
  }

  const renderFormData = () => {
    return jsonForm.map((formItem, index) => {
      if (!formItem) return
      const indexValue = `${index}`

      /**
       *  name string 表单组件名称 如果不填则生成普通的组件
       *  label object/string 表单名称
       *  required Boolean 校验选项
       *  type string 组件类型
       *  message string 单个表单校验信息
       *  component object 组件类型type不匹配时使用component内的组件
       *  componentProps object antd组件原生选项
       *  options array antd组件select 使用的子组件,默认值数组 label与value键值对，也可以传入对象{item:Array,label:keyName,value:valueName}
       *  disabledKeys array antd组件select 使用的子组件,默认值数组 用于禁用部分不使用的option
       *  itemCol 单个组件col栅格大小设置
       *  hidden 单个组件显隐
       */
      const {
        required,
        type,
        name,
        label = name,
        message = `Please input ${label}`,
        component,
        componentProps,
        itemCol,
        hidden = false,
        initialValue,
        disabledKeys,
        className,
        style,
        colon = false,
        labelCol,
        wrapperCol,
        options,
        ...resetProps
      } = formItem

      const defaultCol =
        labelCol || wrapperCol
          ? {
            labelCol,
            wrapperCol,
          }
          : {}

      const rulesProps = specialRules[type] || {}

      return (
        <Col
          {...col}
          {...itemCol}
          key={indexValue}
          className={classNames(className, hidden ? styles.hidden : null)}
          style={style}
        >
          <Field
            name={name}
            className={styles.schemaForms}
            label={label}
            required={!!required}
            colon={colon}
            rules={[{ required: !!required, message, ...rulesProps }]}
            initialValue={initialValue}
            {...defaultCol}
            {...resetProps}
          >
            {getFormItem({
              type,
              component,
              componentProps,
              options,
              disabledKeys,
              name,
              label,
            })}
          </Field>
        </Col>
      )
    })
  }

  return (
    <Form form={form || selfForm} {...otherProps}>
      <Row {...row}>
        {renderFormData()}
        {children}
      </Row>
    </Form>
  )
}
export default SchemaForm
