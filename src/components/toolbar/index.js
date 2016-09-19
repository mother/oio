import React from 'react'

import styles from './styles.less'

const UIToolbar = ({ children }) => (
   <div className={styles.uiToolbar}>{children}</div>
)

UIToolbar.propTypes = {
   children: React.PropTypes.node
}

export default UIToolbar
