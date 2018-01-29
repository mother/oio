import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

// This is going to be smarter evntually
const Icon = ({ name, className, style }) => {
   let icon = null

   if (name) {
      const classes = `icon ${name}`
      icon = <span className={classNames(classes, className)} style={style} />
   }

   return icon
}

Icon.propTypes = {
   className: PropTypes.string,
   name: PropTypes.string,
   style: PropTypes.object
}

export default Icon
