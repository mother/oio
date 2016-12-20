import React, { Component } from 'react'
import classNames from 'classnames'
import convertColor from '../../utils/convertColor'
import Icon from '../Icon'
import style from './style.less'

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
      const buttonTextClasses = [style.text]
      const buttonName = this.props.name

      const buttonStyle = {
         backgroundColor: buttonColor,
         color: '#fff'
      }

      buttonClasses.push(style[this.props.size])

      // Button Color by default will use the OIO primary color
      // Otherwise, it will use the color passed directly to the button
      if (this.props.color) {
         buttonColor = this.props.color
         buttonColorRGB = convertColor(buttonColor)
      }

      if (this.props.icon) {
         if (this.props.name) {
            buttonClasses.push(style[`${this.props.size}IconAndText`])
         } else {
            buttonClasses.push(style[`${this.props.size}IconOnly`])
         }
      }

      if (this.props.mode) {
         buttonClasses.push(style[`${this.props.mode}Mode`])
         modeIcon = <span className={style.loader} />
      }

      if (this.props.rounded) {
         buttonClasses.push(style[`${this.props.size}Rounded`])
      }

      if (this.props.outline) {
         buttonClasses.push(style.outline)
         buttonStyle.color = buttonColor
         buttonStyle.borderColor = buttonColor
         delete buttonStyle.backgroundColor
      }

      if (this.props.outlineNegative) {
         buttonClasses.push(style.outlineNegative)
         delete buttonStyle.backgroundColor
      }

      if (this.props.plain) {
         buttonClasses.push(style.plain)
         buttonStyle.color = buttonColor
         delete buttonStyle.backgroundColor

         if (this.state.hover) {
            buttonStyle.backgroundColor =
               `rgba(${buttonColorRGB.r},
               ${buttonColorRGB.g},
               ${buttonColorRGB.b}, 0.15)`
         }
      }

      if (this.props.textClassName) {
         buttonTextClasses.push(this.props.textClassName)
      }

      // If Buttons are part of a Button Group
      if (this.context.buttonGroupStyle) {
         const buttonGroup = this.context.buttonGroupStyle
         buttonStyle.marginBottom = buttonGroup.spacing
         buttonStyle.verticalAlign = 'middle'

         if (buttonGroup.align === 'left') {
            buttonStyle.marginRight = buttonGroup.spacing
         } else if (buttonGroup.align === 'right') {
            buttonStyle.marginLeft = buttonGroup.spacing
         }
      }

      return (
         <button
            className={classNames(buttonClasses)}
            onClick={this.props.onClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            style={buttonStyle}
            type={this.props.type}>
            <Icon className={style.icon} name={this.props.icon} />
            <span className={classNames(style.text, buttonTextClasses)}>{buttonName}</span>
            {modeIcon}
         </button>
      )
   }
}
