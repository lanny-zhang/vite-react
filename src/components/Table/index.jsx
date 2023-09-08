/* eslint-disable max-len */
import React, { useMemo } from 'react'
import {
  Table, Tooltip, Form, Col, Button, Grid,
} from 'antd'

import isArray from 'lodash/isArray'
import SchemaForm from '@/components/SchemaForm'
import styles from './index.module.less'

/**
 * @description
 * schemaTable表格组件
 *
 * @argument
 *
 * @type {Array}
 *  columns
 * @type {Array}
 *  dataSource
 * @type {object}
 * pagination current = 1, pageSize = 10, total = 0
 * @type {Function}
 *  onChange  分页、排序、筛选变化时触发 Function(pagination, filters, sorter, extra: {           currentDataSource: [] })
 * @type {string}
 * defaultNullValue 数据为空时默认显示的值
 */
const SchemaTable = ({
  dataSource = [], // 数据源 包含current pageSize total dataSource
  pagination: paginationProps = {},
  onChange = () => {},
  columns = [],
  defaultNullValue = '—',
  loading,
  form,
  searchButton,
  onSearch,
  searchForm,
  formProps,
  ...tableProps
}) => {
  const {
    current = 1, pageSize = 10, total = 0, ...otherPagenation
  } = paginationProps

  const checkNullValue = (defaultValue) => {
    if (defaultNullValue === null || defaultNullValue === undefined) return defaultValue
    if (defaultValue === null || defaultValue === undefined || defaultValue === '') {
      return defaultNullValue
    }
    return defaultValue
  }

  const columnsConfig = columns.map((columnsItem) => {
    const { handleText = () => {}, placement = 'topLeft' } = columnsItem // 用户定制文本
    return {
      render: (beforeText, record) => {
        let text = handleText(beforeText, record) || beforeText
        text = checkNullValue(text)
        return (
          <Tooltip placement={placement} title={text}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {text}
            </div>
          </Tooltip>
        )
      },
      ...columnsItem,
    }
  })

  const pagination = (config = {}) => {
    if (config === false) return false
    if (!(config instanceof Object)) return false
    return {
      current,
      pageSize,
      total,
      size: 'small',
      showSizeChanger: true,
      defaultCurrent: 1,
      pageSizeOptions: ['10', '20', '30', '40'],
      ...config,
    }
  }

  return (
    <div className={styles.tableStyle}>
      {searchForm ? (
        <SearchFrom
          loading={loading}
          form={form}
          searchButton={searchButton}
          onSearch={onSearch}
          searchForm={searchForm}
          {...formProps}
        />
      ) : null}
      <Table
        onChange={onChange}
        size='middle'
        scroll={{ x: true }}
        dataSource={dataSource}
        columns={columnsConfig}
        pagination={pagination(otherPagenation)}
        {...tableProps}
      />
    </div>
  )
}

const { useBreakpoint } = Grid

export function SearchFrom({
  searchButton,
  searchForm,
  onSearch,
  style,
  form,
  loading,
  className,
  ...formProps
}) {
  const screens = useBreakpoint()
  const [formInstance] = Form.useForm()

  const searchSpan = useMemo(() => {
    let span = 6
    let columnNum = 4
    if (!screens.lg) {
      span = 8
      columnNum = 3
    }
    if (searchForm && isArray(searchForm)) {
      return (columnNum - (searchForm.length % columnNum)) * span
    }
    return span
  }, [screens, searchForm])

  function handleSearch(values) {
    onSearch(values)
  }

  return (
    <div className={className} style={{ ...style }}>
      <SchemaForm
        form={form || formInstance}
        onFinish={handleSearch}
        labelCol={{ span: 6 }}
        // size='small'
        wrapperCol={{ span: 18 }}
        row={{ gutter: { md: 4, lg: 6, xl: 12 } }}
        col={{
          sm: { span: 8 },
          md: { span: 8 },
          lg: { span: 6 },
          xl: { span: 6 },
        }}
        jsonForm={searchForm}
        {...formProps}
      >
        <Col span={searchSpan}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            {searchButton || (
              <>
                <Button
                  onClick={() => {
                    const formRef = form || formInstance
                    formRef.resetFields()
                    const values = formRef.getFieldsValue(true)
                    onSearch(values)
                  }}
                  style={{ marginRight: 6 }}
                  loading={loading}
                >
                  Reset
                </Button>
                <Button loading={loading} type='primary' htmlType='submit'>
                  Search
                </Button>
              </>
            )}
          </div>
        </Col>
      </SchemaForm>
    </div>
  )
}
export default SchemaTable
