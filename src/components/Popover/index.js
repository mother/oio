import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './styles.less'

export default class Popover extends Component {
   static propTypes = {
      /* eslint-disable */
      children: PropTypes.node,
      className: PropTypes.string,
      offset: PropTypes.string,
      position: PropTypes.string,
      width: PropTypes.string,
      zIndex: PropTypes.string.isRequired
      /* eslint-enable */
   }

   static defaultProps = {
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
      window.addEventListener('mouseup', this.hide, false)
      window.addEventListener('touchend', this.hide, false)
   }

   componentWillUnmount() {
      window.removeEventListener('mouseup', this.hide, false)
      window.removeEventListener('touchend', this.hide, false)
   }

   show = (event) => {
      event.stopPropagation()
      const position = this.props.position
      const triggerButton = event.currentTarget
      const top = position.includes('above') ? (-1 * this.popover.clientHeight) : triggerButton.offsetTop
      this.setState({
         top,
         left: triggerButton.offsetLeft,
         buttonWidth: triggerButton.offsetWidth,
         visible: true
      })
   }

   hide = (event) => {
      if (!event.target.closest('.oio-popover')) {
         this.setState({ visible: false })
      }
   }

   render() {
      const { position, zIndex } = this.props
      const visibilityClass = this.state.visible ? 'isVisible' : ''
      const popoverOffset = parseFloat(this.props.offset)
      const popoverWidth = parseFloat(this.props.width)
      const popoverStyle = { zIndex }

      // Set Popover Vertical Position
      // If above is not specified in the position, assume it should be below
      if (position.includes('above')) {
         popoverStyle.top = `${this.state.top}px`
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
         margin: `${popoverOffset}px`,
         width: popoverWidth
      }

      return (
         <div
            ref={(popover) => { this.popover = popover }}
            style={popoverStyle}
            className={classNames('oio-popover', styles.popover, styles[visibilityClass])}>
            <div
               className={classNames(styles.popoverContainer, this.props.className)}
               style={popoverContainerStyle}>
               {this.props.children}
            </div>
         </div>
      )
   }
}
