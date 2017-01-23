import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './styles.less'

export default class Popover extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      height: React.PropTypes.string,
      offset: React.PropTypes.string,
      position: React.PropTypes.string,
      width: React.PropTypes.string
   }

   static defaultProps = {
      height: '300',
      offset: '24',
      position: 'above left',
      width: '300'
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
      const button = event
      button.stopPropagation()

      this.setState({
         top: button.currentTarget.offsetTop,
         left: button.currentTarget.offsetLeft,
         visible: true,
         buttonWidth: button.currentTarget.offsetWidth
      })
   }

   hide() {
      this.setState({ visible: false })
   }

   render() {
      const position = this.props.position
      const visibilityClass = this.state.visible ? 'isVisible' : ''
      const popoverStyle = {}
      const popoverOffset = parseFloat(this.props.offset)
      const popoverWidth = parseFloat(this.props.width)
      const popoverHeight = parseFloat(this.props.height)

      // If above is not specified in the position, assume it should be below
      if (position.includes('above')) {
         console.log
         popoverStyle.top = `${this.state.top - popoverOffset - popoverHeight}px`
      } else {
         popoverStyle.top = `${this.state.top + popoverOffset}px`
      }

      // Set Popover Position
      if (position.includes('right')) {
         popoverStyle.left = `${this.state.left - popoverOffset - (popoverWidth - this.state.buttonWidth)}px`
      } else if (position.includes('left')) {
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
