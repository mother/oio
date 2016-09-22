import React from 'react'
import classNames from 'classnames'

import colors from '../../foundation/colors.less'

const Title = ({ children, className, color, heading, size, weight }) => {
   // By default, titles are bigger and have
   // heavier weight than UI Text

   let fontSize = 'uiTextSize5'
   const HeadingTag = `h${heading}`

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
      <HeadingTag className={classes}>{children}</HeadingTag>
   )
}

Title.propTypes = {
   children: React.PropTypes.node,
   className: React.PropTypes.string,
   color: React.PropTypes.string,
   heading: React.PropTypes.string,
   size: React.PropTypes.string,
   weight: React.PropTypes.string
}

Title.defaultProps = {
   weight: 'medium'
}

export default Title
