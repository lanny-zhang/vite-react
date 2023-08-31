/* eslint-disable max-len */
import React from 'react'
import { Table, Tooltip } from 'antd'
import styles from './index.less'

const SchemaTable = ({
  dataList = [], // 数据源 包含current pageSize total dataSource
  tableConfig = {}, // 列配置项 包含columns(表格columns数组) tableProps(table表格选项) paginationConfig(分页选项),defaultNullValue(String-数值为空默认填值)
  onChange = () => {}, //  分页、排序、筛选变化时触发 Function(pagination, filters, sorter, extra: { currentDataSource: [] })
}) => {
  const {
    dataSource = [], current = 1, pageSize = 10, total = 0,
  } = dataList
  const {
    columns = [], tableProps = {}, paginationConfig, defaultNullValue,
  } = tableConfig

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
      <Table
        onChange={onChange}
        size='middle'
        scroll={{ x: true }}
        dataSource={dataSource}
        columns={columnsConfig}
        pagination={pagination(paginationConfig)}
        {...tableProps}
      />
    </div>
  )
}
export default SchemaTable
