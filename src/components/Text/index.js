import React from 'react'
import classNames from 'classnames'

import colors from '../../foundation/colors.less'

const Text = ({ children, className, color, size, weight }) => {
   let fontSize = 'uiTextSize3'

   if (size) {
      fontSize = `uiTextSize${size}`
   }

   const classes = classNames(
      fontSize,
      weight,
      colors[color],
      className
   )

   return (
      <div className={classes}>
         {children}
      </div>
   )
}

Text.propTypes = {
   children: React.PropTypes.node,
   className: React.PropTypes.string,
   color: React.PropTypes.string,
   size: React.PropTypes.string,
   weight: React.PropTypes.string
}

Text.defaultProps = {
   weight: 'normal'
}

export default Text
