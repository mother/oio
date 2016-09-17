import React from 'react'

import styles from './styles.less'

const UIActionBar = ({ children }) => (
   <div className={styles.uiActionBar}>{children}</div>
)

UIActionBar.propTypes = {
   children: React.PropTypes.node
}

export default UIActionBar
