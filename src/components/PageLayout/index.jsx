import React from 'react'
import styles from './index.module.less'

const PageLayout = ({ children }) => {
  return <div className={styles['page-layout']}>{children}</div>
}

export default PageLayout
