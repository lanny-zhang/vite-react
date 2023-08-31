/* eslint-disable max-len */
import React from 'react'
import { Table, Tooltip } from 'antd'
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
  defaultNullValue,
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
export default SchemaTable
