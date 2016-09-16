import React from 'react'
import styles from './index.less'

const UISpacer = ({ size }) => {
   const spacerSizeClass = `size${size}`

   return (
      <div className={styles[spacerSizeClass]} />
   )
}

UISpacer.propTypes = {
   size: React.PropTypes.string.isRequired
}

export default UISpacer
