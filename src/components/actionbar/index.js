import React from 'react'
import styles from './index.less'

const UIActionbar = ({ children }) => (
   <div className={styles.uiActionbar}>{children}</div>
)

UIActionbar.propTypes = {
   children: React.PropTypes.node
}

export default UIActionbar
