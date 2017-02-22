import React from 'react'
import styles from './styles.less'

const Spacer = ({ size }) => {
   const spacerSizeClass = `size${size}`

   return (
      <div className={styles[spacerSizeClass]} />
   )
}

Spacer.propTypes = {
   size: React.PropTypes.string.isRequired
}

export default Spacer
