import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import classNames from 'classnames'
import convertColor from '../../utils/convertColor'
import Icon from '../Icon'
import style from './style.less'

export default class Button extends Component {
   static propTypes = {
      className: React.PropTypes.string,
      color: React.PropTypes.string,
      icon: React.PropTypes.string,
      indexLink: React.PropTypes.bool,
      link: React.PropTypes.string,
      mode: React.PropTypes.string,
      name: React.PropTypes.string,
      onClick: React.PropTypes.func,
      outline: React.PropTypes.bool,
      plain: React.PropTypes.bool,
      rounded: React.PropTypes.bool,
      size: React.PropTypes.string,
      textClassName: React.PropTypes.string,
      type: React.PropTypes.string
   }

   static defaultProps = {
      mode: 'normal',
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
      let activeStyleObj = null
      let buttonLinkObj = null
      let ButtonElement = 'button'
      let modeIcon = null

      // Buttons might be used as a html <button>, <Link> or <IndexLink>
      // IndexLink is just a boolean. It requires a link to be passed to the link prop
      if (this.props.link) {
         ButtonElement = Link
         buttonLinkObj = { to: this.props.link }
      }
      if (this.props.indexLink) ButtonElement = IndexLink

      // buttonColorRGB is an Object with r,g,b values
      // Sometimes you want to use the color as is directly,
      // other times when you want to control the Alpha Transparency,
      // you wan to yse the RGBA values
      let buttonColor = this.context.OIOStyles.primaryColor
      let buttonColorRGB = convertColor(buttonColor)

      const buttonClasses = [this.props.className]
      const buttonTextClasses = [style.text]
      const buttonName = this.props.name
      const mode = this.props.mode

      const buttonStyle = {
         backgroundColor: buttonColor,
         color: '#fff'
      }

      if (this.props.textClassName) {
         buttonTextClasses.push(this.props.textClassName)
      }

      buttonClasses.push(style[this.props.size])

      // Button Color by default will use the OIO primary color
      // Otherwise, it will use the color passed directly to the button
      if (this.props.color) {
         buttonColor = this.props.color
         buttonColorRGB = convertColor(buttonColor)
         buttonStyle.backgroundColor = buttonColor
      }

      // =======================================================
      // Button - Normal mode
      // =======================================================

      if (this.props.mode === 'normal' && this.state.hover) {
         buttonStyle.backgroundColor =
            `rgba(${buttonColorRGB.r},
            ${buttonColorRGB.g},
            ${buttonColorRGB.b}, 0.7)`
      }

      // =======================================================
      // Icon
      // =======================================================

      if (this.props.icon) {
         if (this.props.name) {
            buttonClasses.push(style[`${this.props.size}IconAndText`])
         } else {
            buttonClasses.push(style[`${this.props.size}IconOnly`])
         }
      }

      // =======================================================
      // Mode
      // =======================================================

      if (mode === 'loading') {
         buttonClasses.push(style.isLoading)
         modeIcon = <span className={style.loader} />
      } else if (mode === 'disabled') {
         buttonClasses.push(style.isDisabled)
      } else if (mode === 'pulsing') {
         buttonClasses.push(style.isPulsing)
      }

      // =======================================================
      // Style Props
      // =======================================================

      if (this.props.rounded) {
         buttonClasses.push(style[`${this.props.size}Rounded`])
      }

      if (this.props.outline) {
         buttonClasses.push(style.outline)
         buttonStyle.color = buttonColor
         buttonStyle.borderColor =
            `rgba(${buttonColorRGB.r},
            ${buttonColorRGB.g},
            ${buttonColorRGB.b}, 0.6)`
         delete buttonStyle.backgroundColor

         if (this.state.hover) {
            buttonStyle.borderColor =
               `rgba(${buttonColorRGB.r},
               ${buttonColorRGB.g},
               ${buttonColorRGB.b}, 0.95)`
         }
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

      // =======================================================
      // If Buttons are part of a Button Group
      // =======================================================

      if (this.context.buttonGroupStyle) {
         const buttonGroup = this.context.buttonGroupStyle
         buttonStyle.marginBottom = buttonGroup.spacing
         buttonStyle.verticalAlign = 'middle'

         // =======================================================
         // Button Group Alignment
         // =======================================================

         if (buttonGroup.align === 'left') {
            buttonStyle.marginRight = buttonGroup.spacing
         } else if (buttonGroup.align === 'right') {
            buttonStyle.marginLeft = buttonGroup.spacing
         } else if (buttonGroup.align === 'center') {
            buttonStyle.marginLeft = `${parseFloat(buttonGroup.spacing) / 2}px`
            buttonStyle.marginRight = `${parseFloat(buttonGroup.spacing) / 2}px`
         }

         // =======================================================
         // Buttons are part of a ButtonGroup in segmented list
         // =======================================================

         if (buttonGroup.mode === 'list') {
            buttonClasses.push(style.listItem)
            buttonStyle.color = buttonColor
            delete buttonStyle.backgroundColor

            if (this.state.hover) {
               buttonStyle.backgroundColor =
                  `rgba(${buttonColorRGB.r},
                  ${buttonColorRGB.g},
                  ${buttonColorRGB.b}, 0.15)`
            }
         }

         // =======================================================
         // Buttons are part of a ButtonGroup in segmented mode
         // =======================================================

         if (buttonGroup.mode === 'segmented') {
            buttonClasses.push(style.segmentedItem)
            buttonStyle.color = buttonColor
            buttonStyle.borderLeft = `2px solid
               rgba(${buttonColorRGB.r},
               ${buttonColorRGB.g},
               ${buttonColorRGB.b}, 1)`
            delete buttonStyle.backgroundColor

            if (this.props.link) {
               activeStyleObj = {
                  activeStyle: {
                     backgroundColor: buttonColor,
                     color: '#fff'
                  }
               }
            }

            if (this.state.hover) {
               buttonStyle.backgroundColor =
                  `rgba(${buttonColorRGB.r},
                  ${buttonColorRGB.g},
                  ${buttonColorRGB.b}, 0.15)`
            }
         }
      }

      // =======================================================
      // Render
      // =======================================================

      return (
         <ButtonElement
            className={classNames(buttonClasses)}
            onClick={this.props.onClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            style={buttonStyle}
            type={this.props.type}
            {...activeStyleObj}
            {...buttonLinkObj}>
            <Icon className={style.icon} name={this.props.icon} />
            <span className={classNames(style.text, buttonTextClasses)}>{buttonName}</span>
            {modeIcon}
         </ButtonElement>
      )
   }
}
