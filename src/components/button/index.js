import React, { Component } from 'react'
import classNames from 'classnames'
import convertColor from '../../utils/convertColor'
import Icon from '../Icon'
import styles from './styles.less'

export default class Button extends Component {
   static propTypes = {
      className: React.PropTypes.string,
      color: React.PropTypes.string,
      icon: React.PropTypes.string,
      mode: React.PropTypes.string,
      name: React.PropTypes.string,
      onClick: React.PropTypes.func,
      outline: React.PropTypes.bool,
      outlineNegative: React.PropTypes.bool,
      plain: React.PropTypes.bool,
      rounded: React.PropTypes.bool,
      size: React.PropTypes.string,
      textClassName: React.PropTypes.string,
      type: React.PropTypes.string
   }

   static defaultProps = {
      size: 'medium',
      type: 'button'
   }

   static contextTypes = {
      buttonGroupStyle: React.PropTypes.object,
      OIOStyles: React.PropTypes.object
   }

   constructor(props, context) {
      super(props, context)

      this.state = { hover: false }
      this.onMouseOver = this.onMouseOver.bind(this)
      this.onMouseOut = this.onMouseOut.bind(this)
   }

   onMouseOver() {
      this.setState({ hover: true })
   }

   onMouseOut() {
      this.setState({ hover: false })
   }

   render() {
      let modeIcon

      // buttonColorRGB is an Object with r,g,b values
      // Sometimes you want to use the color as is directly,
      // other times when you want to control the Alpha Transparency,
      // you wan to yse the RGBA values
      let buttonColor = this.context.OIOStyles.primaryColor
      let buttonColorRGB = convertColor(buttonColor)

      const buttonClasses = [this.props.className]
      const buttonTextClasses = [styles.text]
      const buttonName = this.props.name

      const style = {
         backgroundColor: buttonColor,
         color: '#fff'
      }

      buttonClasses.push(styles[this.props.size])

      // Button Color by default will use the OIO primary color
      // Otherwise, it will use the color passed directly to the button
      if (this.props.color) {
         buttonColor = this.props.color
         buttonColorRGB = convertColor(buttonColor)
      }

      if (this.props.icon && this.props.name) {
         buttonClasses.push(styles[`${this.props.size}IconAndText`])
      }

      if (this.props.icon && !this.props.name) {
         buttonClasses.push(styles[`${this.props.size}IconOnly`])
      }

      if (this.props.mode) {
         buttonClasses.push(styles[`${this.props.mode}Mode`])
         modeIcon = <span className={styles.loader} />
      }

      if (this.props.rounded) {
         buttonClasses.push(styles[`${this.props.size}Rounded`])
      }

      if (this.props.outline) {
         buttonClasses.push(styles.outline)
         style.color = buttonColor
         style.borderColor = buttonColor
         delete style.backgroundColor
      }

      if (this.props.outlineNegative) {
         buttonClasses.push(styles.outlineNegative)
         delete style.backgroundColor
      }

      if (this.props.plain) {
         buttonClasses.push(styles.plain)
         style.color = buttonColor
         delete style.backgroundColor

         if (this.state.hover) {
            style.backgroundColor = `rgba(${buttonColorRGB.r}, ${buttonColorRGB.g}, ${buttonColorRGB.b}, 0.15)`
         }
      }

      if (this.props.textClassName) {
         buttonTextClasses.push(this.props.textClassName)
      }

      // If Buttons are part of a Button Group
      if (this.context.buttonGroupStyle) {
         const buttonGroup = this.context.buttonGroupStyle
         style.marginBottom = buttonGroup.spacing
         style.verticalAlign = 'middle'

         if (buttonGroup.align === 'left') {
            style.marginRight = buttonGroup.spacing
         } else if (buttonGroup.align === 'right') {
            style.marginLeft = buttonGroup.spacing
         }
      }

      return (
         <button
            className={classNames(buttonClasses)}
            onClick={this.props.onClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            style={style}
            type={this.props.type}>
            <Icon className={styles.icon} name={this.props.icon} />
            <span className={classNames(styles.text, buttonTextClasses)}>{buttonName}</span>
            {modeIcon}
         </button>
      )
   }
}
