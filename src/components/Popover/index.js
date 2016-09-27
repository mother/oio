import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'

export default class Popover extends React.Component {
   static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      width: React.PropTypes.string.isRequired
   }

   constructor(props, context) {
      super(props, context)

      this.state = {
         hitAreaMargin: 24,
         top: 0,
         left: 0,
         visible: false,
         position: 'below left'
      }
   }

   componentDidMount() {
      window.addEventListener('click', this.hide.bind(this), false)
   }

   componentWillUnmount() {
      window.removeEventListener('click', this.hide.bind(this), false)
   }

   show(event) {
      event.stopPropagation()

      this.setState({
         top: event.currentTarget.offsetTop,
         left: event.currentTarget.offsetLeft,
         visible: true
      })
   }

   hide() {
      this.setState({ visible: false })
   }

   render() {
      let visibilityClass = ''
      const popoverStyle = {
         top: `${this.state.top + this.state.hitAreaMargin}px`,
         left: `${this.state.left - this.state.hitAreaMargin}px`,
         width: this.props.width
      }

      const popoverContainerStyle = {
         margin: this.state.hitAreaMargin
      }

      if (this.state.visible) visibilityClass = 'isVisible'

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
