import React, { Component } from 'react'
import classNames from 'classnames'

import style from './style.less'
import colors from '../../foundation/colors.less'

export default class Text extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      color: React.PropTypes.string,
      editable: React.PropTypes.bool,
      size: React.PropTypes.string,
      uppercase: React.PropTypes.bool,
      weight: React.PropTypes.string
   }

   static defaultProps = {
      weight: 'normal'
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
   }

   render() {
      const fontSize = this.props.size ? `textSize${this.props.size}` : 'textSize3'
      const textStyle = {}

      const classes = [
         style[fontSize],
         style[this.props.weight],
         colors[this.props.color],
         this.props.className
      ]

      if (this.props.uppercase) {
         classes.push(style.uppercase)
      }

      return (
         <div className={classNames(classes)} style={textStyle}>
            {this.props.editable && (
               <div
                  className={classNames('icon', 'ion-edit', style.editable)}
                  style={{ float: 'right' }}
               />
            )}
            {this.props.children}
         </div>
      )
   }
}
