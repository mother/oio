import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import style from './style.less'

export default class Popover extends Component {
   static propTypes = {
      animation: PropTypes.oneOf(['scaleIn', 'none']).isRequired,
      children: PropTypes.node,
      className: PropTypes.string,
      height: PropTypes.string,
      offset: PropTypes.string,
      position: PropTypes.string,
      width: PropTypes.string,
      zIndex: PropTypes.string.isRequired
   }

   static defaultProps = {
      animation: 'scaleIn',
      height: 'auto',
      offset: '24',
      position: 'above left',
      width: '300',
      zIndex: '800'
   }

   constructor(props) {
      super(props)

      this.state = {
         top: 0,
         left: 0,
         visible: false,
         buttonWidth: 0
      }
   }

   componentDidMount() {
      window.addEventListener('click', this.hide, false)
   }

   componentWillUnmount() {
      window.removeEventListener('click', this.hide, false)
   }

   show = (event) => {
      event.stopPropagation()

      const triggerButton = event.currentTarget
      this.setState({
         top: triggerButton.offsetTop,
         left: triggerButton.offsetLeft,
         buttonWidth: triggerButton.offsetWidth,
         visible: true
      }, () => {
         // console.log(this.popover, this.popover.clientHeight,
         //  this.content, this.content.clientHeight)
      })
   }

   hide = (event) => {
      event.stopPropagation()
      this.setState({ visible: false })
   }

   render() {
      const { animation, height, offset, position, zIndex, width } = this.props
      const visibilityClass = this.state.visible ? 'isVisible' : ''
      const popoverClasses = [style.popover, style[visibilityClass], style[animation]]

      const popoverOffset = parseFloat(offset)
      const popoverWidth = parseFloat(width)
      const popoverHeight = parseFloat(height)
      const popoverStyle = { zIndex, width }

      // Set Popover Vertical Position
      // If above is not specified in the position, assume it should be below
      if (position.includes('above')) {
         popoverStyle.top = `${this.state.top - (2 * popoverOffset) - popoverHeight}px`
      } else {
         popoverStyle.top = `${this.state.top + popoverOffset}px`
      }

      // Set Popover Horizontal Position
      // If left or right is not set, assume left alignment
      if (position.includes('right')) {
         popoverStyle.left = `${this.state.left - popoverOffset - (popoverWidth - this.state.buttonWidth)}px`
      } else {
         popoverStyle.left = `${this.state.left - popoverOffset}px`
      }

      // Set Popover Margins and Container
      const popoverContainerStyle = {
         height: popoverHeight,
         margin: `${popoverOffset}px`,
         width: '100%'
      }

      if (height === 'auto') {
         delete popoverContainerStyle.height
      }

      return (
         <div
            ref={(popover) => { this.popover = popover }}
            style={popoverStyle}
            className={classNames(popoverClasses)}>
            <div
               ref={(content) => { this.content = content }}
               className={classNames(style.popoverContainer, this.props.className)}
               style={popoverContainerStyle}>
               {this.props.children}
            </div>
         </div>
      )
   }
}
