import React, { useState } from 'react'
import {
  AutoComplete, Button, Cascader, Col, Form, Input, Row, Select, Checkbox,
} from 'antd'
import SchemaForm from '@/components/SchemaForm'
import PageLayout from '@/components/PageLayout'

const { Option } = Select
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
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    span: 16,
    offset: 8,
  },
}
const PageOne = () => {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value='86'>+86</Option>
        <Option value='87'>+87</Option>
      </Select>
    </Form.Item>
  )

  const suffixSelector = (
    <Form.Item name='suffix' noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value='USD'>$</Option>
        <Option value='CNY'>¥</Option>
      </Select>
    </Form.Item>
  )

  const [autoCompleteResult, setAutoCompleteResult] = useState([])

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([])
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`))
    }
  }

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }))

  const jsonForm = [
    {
      type: 'input',
      name: 'email',
      label: 'E-mail',
      required: true,
      rules: [
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input your E-mail!',
        },
      ],
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      required: true,
      hasFeedback: true,
    },
    {
      type: 'confirm-password',
      name: 'confirm',
      label: 'Confirm Password',
      dependencies: ['password'],
      hasFeedback: true,
      rules: [
        {
          required: true,
          message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve()
            }
            return Promise.reject(new Error('The new password that you entered do not match!'))
          },
        }),
      ],
    },
    {
      type: 'input',
      name: 'nickname',
      label: 'Nickname',
      tooltip: 'What do you want others to call you?',
    },
    {
      type: 'cascader',
      name: 'residence',
      label: 'Habitual Residence',
      options: residences,
      required: true,
    },
    {
      type: 'input',
      name: 'phone',
      label: 'Phone Number',
      required: true,
      componentProps: {
        addonBefore: prefixSelector,
      },
    },
    {
      name: 'donation',
      label: 'Donation',
      type: 'input-number',
      componentProps: {
        addonAfter: suffixSelector,
        style: { width: '100%' },
      },
    },
    {
      name: 'website',
      label: 'Website',
      component: (
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder='website'>
          <Input />
        </AutoComplete>
      ),
    },
    {
      name: 'intro',
      label: 'Intro',
      type: 'text-area',
    },
    {
      type: 'select',
      name: 'gender',
      label: 'Gender',
      options: [
        {
          label: 'Male',
          value: 'male',
        },
        {
          label: 'Female',
          value: 'female',
        },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      label: 'Captcha',
      extra: 'We must make sure that your are a human.',
      component: (
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name='captcha'
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input the captcha you got!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      ),
    },
    {
      component: <Checkbox>I have read the agreement</Checkbox>,
      wrapperCol: tailFormItemLayout.wrapperCol,
    },
  ]

  return (
    <PageLayout>
      <SchemaForm
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
        jsonForm={jsonForm}
      >
        <Col span={24}>
          <Form.Item {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
              Register
            </Button>
          </Form.Item>
        </Col>
      </SchemaForm>
    </PageLayout>
  )
}
export default PageOne
