import React from 'react'
import styles from './index.less'

const UIToolbar = (props) => (
   <div className={styles.uiToolbar}>{props.children}</div>
)

UIToolbar.propTypes = {
   children: React.PropTypes.node
}

export default UIToolbar
