import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './styles.less'

export default class Popover extends Component {
   static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      height: PropTypes.string,
      offset: PropTypes.string,
      position: PropTypes.string,
      width: PropTypes.string
   }

   static defaultProps = {
      height: '60',
      offset: '24',
      position: 'above left',
      width: '300'
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
      })
   }

   hide = (event) => {
      event.stopPropagation()
      this.setState({ visible: false })
   }

   render() {
      const position = this.props.position
      const visibilityClass = this.state.visible ? 'isVisible' : ''
      const popoverStyle = {}
      const popoverOffset = parseFloat(this.props.offset)
      const popoverWidth = parseFloat(this.props.width)
      const popoverHeight = parseFloat(this.props.height)

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
         height: `${popoverHeight}px`,
         margin: `${popoverOffset}px`,
         width: popoverWidth
      }

      return (
         <div
            style={popoverStyle}
            className={classNames(styles.popover, styles[visibilityClass])}>
            <div
               className={classNames(styles.popoverContainer, this.props.className)}
               style={popoverContainerStyle}>
               {this.props.children}
            </div>
         </div>
      )
   }
}
