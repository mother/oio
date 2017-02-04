import React from 'react'
import classNames from 'classnames'

// This is going to be smarter evntually
const Icon = ({ name, className }) => {
   let icon = null

   if (name) {
      const classes = `icon ${name}`
      icon = <span className={classNames(classes, className)} />
   }

   return icon
}

Icon.propTypes = {
   className: React.PropTypes.string,
   name: React.PropTypes.string
}

export default Icon
