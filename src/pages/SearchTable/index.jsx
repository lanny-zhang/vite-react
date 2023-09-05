import React, { useState } from 'react'
import { Tag, Form } from 'antd'
import SchemaTable from '@/components/SchemaTable'
import PageLayout from '@/components/PageLayout'
import { getRandomElements } from '@/util/javascript'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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

const data = []
const tagsList = ['nice', 'developer', 'cool', 'teacher']
const names = [
  'John',
  'Jane',
  'Michael',
  'Emily',
  'David',
  'Olivia',
  'Daniel',
  'Sophia',
  'Matthew',
  'Isabella',
]

// eslint-disable-next-line no-plusplus
for (let index = 0; index < 50; index++) {
  data.push({
    key: index,
    name: getRandomElements(names, 1)[0],
    age: Math.floor(Math.random() * 100) + 1,
    address: `New York No. ${index} Lake Park`,
    tags: getRandomElements(tagsList, 2),
  })
}

const SearchTable = () => {
  const [form] = Form.useForm()
  const [dataSource, setDataSource] = useState(data)
  const [pagenation, setPagenation] = useState({
    current: 1,
    total: data.length,
  })
  return (
    <PageLayout>
      <SchemaTable
        form={form}
        pagination={pagenation}
        onChange={({ current, pageSize }) => {
          setPagenation({
            ...pagenation,
            current,
            pageSize,
          })
        }}
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
            options: tagsList.map((i) => {
              const v = i.toLocaleUpperCase()
              return { label: v, value: i }
            }),
          },
        ]}
        columns={columns}
        dataSource={dataSource}
      />
    </PageLayout>
  )
}

export default SearchTable
