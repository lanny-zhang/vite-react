import React from 'react'
import classname from 'classname'
import styles from './index.module.less'

const Tabs = ({ value, onChange, children }) => {
  return (
    <div className={styles.tabs}>
      <div className={styles['tabs-header']}>
        {React.Children.map(children, (ele) => {
          const { value: childValue, label } = ele.props
          return (
            <div
              onClick={() => {
                onChange(childValue)
              }}
              key={value}
              className={classname(styles['header-tab'], {
                [styles['tab-active']]: value === childValue,
              })}
            >
              {label}
            </div>
          )
        })}
      </div>
      <div className={styles['tabs-content']}>
        {React.Children.map(children, (ele) => {
          const { value: childValue } = ele.props
          return React.cloneElement(ele, {
            className: value === childValue ? '' : styles['tab-hidden'],
          })
        })}
      </div>
    </div>
  )
}

const TabPanel = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

export { TabPanel }
export default Tabs
