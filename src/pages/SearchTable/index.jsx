import React from 'react'
import { Tag, Form } from 'antd'
import { Link } from 'react-router-dom'
import SchemaTable from '@/components/SchemaTable'
import PageLayout from '@/components/PageLayout'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <Link to={`/basic/table/basic-table/detail?id=${text}`}>{text}</Link>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Column1',
    dataIndex: 'column1',
    key: 'column1',
  },
  {
    title: 'Column2',
    dataIndex: 'column2',
    key: 'column2',
  },
  {
    title: 'Column3',
    dataIndex: 'column3',
    key: 'column3',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
  },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

const SearchTable = () => {
  const [form] = Form.useForm()
  return (
    <PageLayout>
      <SchemaTable
        form={form}
        onSearch={(values) => {
          console.log(values)
        }}
        searchForm={[
          {
            label: 'Name',
            type: 'input',
            name: 'name',
          },
          {
            label: 'Age',
            type: 'select',
            name: 'age',
            options: [
              { label: 'Age 1', value: 'Age1' },
              { label: 'Age 2', value: 'Age2' },
            ],
          },
          {
            label: 'Tag',
            type: 'select',
            name: 'tag',
            options: [
              { label: 'Nice', value: 'Nice' },
              { label: 'Loser', value: 'Loser' },
            ],
          },
        ]}
        columns={columns}
        dataSource={data}
      />
    </PageLayout>
  )
}

export default SearchTable
