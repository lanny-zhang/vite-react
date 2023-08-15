/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Breadcrumb as Bread } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.mudule.less'

const Breadcrumb = (props) => {
  const { route } = props

  const items = route.map(i => {
    return {
      title: <Link to={i.path}>{i?.title}</Link>,
    }
  })

  return (
    <div style={{ margin: '12px 0' }} className={styles.breadcrumb}>
      <Bread
        items={items}
      />
    </div>
  )
}
export default Breadcrumb
