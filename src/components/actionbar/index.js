import React from 'react'
import styles from './styles.less'

const ActionBar = ({ children }) => (
   <div className={styles.actionBar}>{children}</div>
)

ActionBar.propTypes = {
   children: React.PropTypes.node
}

export default ActionBar
