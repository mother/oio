import React from 'react'
import classNames from 'classnames'
import style from './style.less'
import colors from '../../foundation/colors.less'

const Text = ({
   children, className, color, size, uppercase, weight }, context) => {
   const fontSize = size ? `textSize${size}` : 'textSize3'
   const textStyle = {}

   const classes = [
      style[fontSize],
      style[weight],
      colors[color],
      className
   ]

   if (uppercase) {
      classes.push(style.uppercase)
   }

   return (
      <div className={classNames(classes)} style={textStyle}>
         {children}
      </div>
   )
}

Text.propTypes = {
   children: React.PropTypes.node,
   className: React.PropTypes.string,
   color: React.PropTypes.string,
   size: React.PropTypes.string,
   uppercase: React.PropTypes.bool,
   weight: React.PropTypes.string
}

Text.defaultProps = {
   weight: 'normal'
}

Text.contextTypes = {
   OIOStyles: React.PropTypes.object
}

export default Text
