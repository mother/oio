import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './styles.less'

export default class Popover extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      offset: React.PropTypes.string,
      position: React.PropTypes.string,
      width: React.PropTypes.string.isRequired
   }

   static defaultProps = {
      offset: '24'
   }

   constructor(props, context) {
      super(props, context)

      this.hide = this.hide.bind(this)

      // Eventually allow smart positioning and below/above
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

   show(event) {
      event.stopPropagation()

      this.setState({
         top: event.currentTarget.offsetTop,
         left: event.currentTarget.offsetLeft,
         visible: true,
         buttonWidth: event.currentTarget.offsetWidth
      })
   }

   hide() {
      this.setState({ visible: false })
   }

   render() {
      const visibilityClass = this.state.visible ? 'isVisible' : ''
      const popoverStyle = {}
      const popoverOffset = parseFloat(this.props.offset)
      const popoverWidth = parseFloat(this.props.width)

      // Set Popover Position
      if (this.props.position === 'right') {
         popoverStyle.top = `${this.state.top + popoverOffset}px`
         popoverStyle.left = `${this.state.left - popoverOffset - (popoverWidth - this.state.buttonWidth)}px`
      } else {
         popoverStyle.top = `${this.state.top + popoverOffset}px`
         popoverStyle.left = `${this.state.left - popoverOffset}px`
      }

      // Set Popover Margins and Container
      const popoverContainerStyle = {
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
