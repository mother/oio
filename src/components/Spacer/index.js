import PropTypes from 'prop-types'
import React from 'react'
import styles from './styles.less'

const Spacer = ({ size }) => {
   const spacerSizeClass = `size${size}`

   return (
      <div className={styles[spacerSizeClass]} />
   )
}

Spacer.propTypes = {
   size: PropTypes.string.isRequired
}

export default Spacer
