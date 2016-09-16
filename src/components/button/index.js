import React from 'react'
import classNames from 'classnames'
import UIIcon from '../icon'
import styles from './index.less'

export default class UIBtn extends React.Component {
   static propTypes = {
      className: React.PropTypes.string,
      icon: React.PropTypes.string,
      name: React.PropTypes.string,
      outline: React.PropTypes.bool,
      rounded: React.PropTypes.bool,
      size: React.PropTypes.string
   }

   static defaultProps = {
      size: 'medium'
   }

   static contextTypes = {
      btnGroupStyle: React.PropTypes.object
   }

   render() {
      const btnClasses = [this.props.className]
      const btnName = this.props.name
      const style = {}

      btnClasses.push(styles[this.props.size])

      if (this.props.icon && this.props.name) {
         btnClasses.push(styles[`${this.props.size}IconAndText`])
      }

      if (this.props.icon && !this.props.name) {
         btnClasses.push(styles[`${this.props.size}IconOnly`])
      }

      if (this.props.rounded) {
         btnClasses.push(styles[`${this.props.size}Rounded`])
      }

      if (this.props.outline) {
         btnClasses.push(styles.outline)
      }

      // If Buttons are part of a Button Group
      if (this.context.btnGroupStyle) {
         const btnGroup = this.context.btnGroupStyle
         style.float = 'left'
         if (btnGroup.align === 'left') {
            style.marginRight = btnGroup.spacing
         } else if (btnGroup.align === 'right') {
            style.marginLeft = btnGroup.spacing
         }
      }

      return (
         <span className={classNames(btnClasses)} style={style}>
            <UIIcon className={styles.icon} name={this.props.icon} />
            <span className={styles.text}>{btnName}</span>
         </span>
      )
   }
}
