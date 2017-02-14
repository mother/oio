import React, { Component } from 'react'
import classNames from 'classnames'
import { getWindowSize, getAttributeForCurrentSize } from '../../utils/size'
import style from './style.less'
import colors from '../../foundation/colors.less'

export default class Text extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      color: React.PropTypes.string,
      size: React.PropTypes.string,
      uppercase: React.PropTypes.bool,
      weight: React.PropTypes.string
   }

   static defaultProps = {
      size: '3',
      weight: 'normal'
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
   }

   constructor(props, context) {
      super(props, context)

      this.state = {
         size: getWindowSize()
      }

      this.windowSizeUpdated = this.windowSizeUpdated.bind(this)
   }

   componentDidMount() {
      window.addEventListener('resize', this.windowSizeUpdated, false)
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.windowSizeUpdated)
   }

   windowSizeUpdated() {
      const windowSize = getWindowSize()
      this.setState({ size: windowSize })
   }

   render() {
      const fontSize = `textSize${getAttributeForCurrentSize(this.state.size, this.props.size)}`
      const textStyle = {}

      const textClasses = [
         style[fontSize],
         style[this.props.weight],
         colors[this.props.color],
         this.props.className
      ]

      if (this.props.uppercase) {
         textClasses.push(style.uppercase)
      }

      return (
         <div className={classNames(textClasses)} style={textStyle}>
            {this.props.children}
         </div>
      )
   }
}
