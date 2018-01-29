import PropTypes from 'prop-types'
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
   children: PropTypes.node,
   className: PropTypes.string,
   color: PropTypes.string,
   heading: PropTypes.string,
   size: PropTypes.string,
   uppercase: PropTypes.bool,
   weight: PropTypes.string
}

Title.defaultProps = {
   weight: 'medium'
}

Title.contextTypes = {
   OIOStyles: PropTypes.object
}

export default Title
