import React from 'react'
import classNames from 'classnames'
import textColors from '../textColors.less'

export default class UIText extends React.Component {
   static propTypes = {
      children: React.PropTypes.node,
      color: React.PropTypes.string,
      className: React.PropTypes.string,
      size: React.PropTypes.string,
      weight: React.PropTypes.string
   }

   static defaultProps = {
      weight: 'normal'
   }

   render() {
      let fontSize = 'uiTextSize3'

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
         <div className={classes}>
            {this.props.children}
         </div>
      )
   }
}
