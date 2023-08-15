/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Breadcrumb as Bread } from 'antd'
import styles from './index.mudule.less'

const Breadcrumb = () => (
  <div style={{ margin: '12px 0' }} className={styles.breadcrumb}>
    <Bread
      items={[
        {
          title: 'Home',
        },
        {
          title: <a>Application Center</a>,
        },
        {
          title: <a>Application List</a>,
        },
        {
          title: 'An Application',
        },
      ]}
    />
  </div>
)
export default Breadcrumb
