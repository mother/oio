import React from 'react'
import classNames from 'classnames'
import textColors from '../textColors.less'

export default class UITitle extends React.Component {
   static propTypes = {
      children: React.PropTypes.node,
      color: React.PropTypes.string,
      className: React.PropTypes.string,
      heading: React.PropTypes.string,
      size: React.PropTypes.string,
      weight: React.PropTypes.string
   }

   static defaultProps = {
      weight: 'medium'
   }

   render() {
      // By default, titles are bigger and have
      // heavier weight than UI Text

      let fontSize = 'uiTextSize5'
      const HeadingTag = `h${this.props.heading}`

      if (this.props.size) {
         fontSize = `uiTextSize${this.props.size}`
      }

      const classes = classNames(
         fontSize,
         this.props.weight,
         textColors[this.props.color],
         this.props.className
      )

      return (
         <HeadingTag className={classes}>{this.props.children}</HeadingTag>
      )
   }
}
