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
} from '@/components/FormFields'

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
        <InputField required name='input' label='Input' />
        <SelectField name='select' label='Select' />
        <RangePickerField name='range' label='Range' />
        <NumberField name='number' label='Number' />
        <TextAreaField name='textarea' label='TextArea' />
        <DatePickerField name='date' label='Date' fieldProps={{ style: { width: 200 } }} />

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
