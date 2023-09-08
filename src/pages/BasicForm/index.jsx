import React from 'react'
import { Form, Button } from 'antd'
import PageLayout from '@/components/PageLayout'
import {
  InputField,
  SelectField,
  RangePickerField,
  NumberField,
  TextAreaField,
  DatePickerField,
  Field,
  RadioField,
  CascaderField,
} from '@/components/FormFields'

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
]

const options = [
  {
    label: 'item 1',
    value: '1',
  },
  {
    label: 'item 2',
    value: '2',
  },
]

const BasicForm = () => {
  const onFinish = (values) => {
    console.log(values)
  }

  return (
    <PageLayout>
      <Form
        onFinish={onFinish}
        initialValues={{
          input: 'default value',
        }}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
      >
        <InputField required name='input' label='Input Field' />
        <CascaderField required name='cascader' label='Cascader Field' options={residences} />
        <SelectField
          options={options}
          tooltip='This is a tooltip'
          name='select'
          label='Select Field'
        />
        <RangePickerField name='range' label='Range Field' />
        <DatePickerField name='date' label='Date Field' fieldProps={{ style: { width: 200 } }} />
        <NumberField name='number' label='Number Field' />
        <TextAreaField name='textarea' label='TextArea Field' />
        <RadioField name='radio' label='Radio Field' options={options} />
        <Field
          wrapperCol={{
            span: 16,
            offset: 8,
          }}
        >
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Field>
      </Form>
    </PageLayout>
  )
}

export default BasicForm
