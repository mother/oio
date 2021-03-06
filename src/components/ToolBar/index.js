import PropTypes from 'prop-types'
import React from 'react'
import styles from './styles.less'

const Toolbar = ({ children }) => (
   <div className={styles.toolbar}>{children}</div>
)

Toolbar.propTypes = {
   children: PropTypes.node
}

export default Toolbar
