import React from 'react'
import classNames from 'classnames'
import style from '../Text/style.less'
import colors from '../../foundation/colors.less'

const Title = ({ children, className, color, heading, size, uppercase, weight }, context) => {
   // By default, titles are bigger and have
   // heavier weight than UI Text
   const fontSize = size ? `textSize${size}` : 'textSize5'
   const HeadingTag = heading ? `h${heading}` : 'h2'
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

   if (context.OIOStyles && context.OIOStyles.titleFontFamily) {
      textStyle.fontFamily = context.OIOStyles.titleFontFamily
   }

   return (
      <HeadingTag className={classNames(classes)} style={textStyle}>
         {children}
      </HeadingTag>
   )
}

Title.propTypes = {
   children: React.PropTypes.node,
   className: React.PropTypes.string,
   color: React.PropTypes.string,
   heading: React.PropTypes.string,
   size: React.PropTypes.string,
   uppercase: React.PropTypes.bool,
   weight: React.PropTypes.string
}

Title.defaultProps = {
   weight: 'medium'
}

Title.contextTypes = {
   OIOStyles: React.PropTypes.object
}

export default Title
