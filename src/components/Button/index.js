import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import convertColor from '../../utils/convertColor'
import { getWindowSize, getAttributeForCurrentSize } from '../../utils/size'
import Icon from '../Icon'
import style from './style.less'

export default class Button extends Component {
   static propTypes = {
      autoFormRespond: PropTypes.bool,
      className: PropTypes.string,
      color: PropTypes.string,
      icon: PropTypes.string,
      link: PropTypes.oneOfType([
         PropTypes.string,
         PropTypes.object
      ]),
      mode: PropTypes.string,
      name: PropTypes.string,
      onClick: PropTypes.func,
      outline: PropTypes.bool,
      plain: PropTypes.bool,
      rounded: PropTypes.bool,
      size: PropTypes.string,
      textClassName: PropTypes.string,
      translucent: PropTypes.bool,
      type: PropTypes.string
   }

   static defaultProps = {
      mode: 'normal',
      size: 'medium',
      type: 'button'
   }

   static contextTypes = {
      buttonGroup: PropTypes.object,
      buttonGroupStyle: PropTypes.object,
      OIOForm: PropTypes.object,
      OIOStyles: PropTypes.object
   }

   constructor(props) {
      super(props)

      this.state = {
         hover: false,
         size: getWindowSize()
      }
   }

   componentDidMount() {
      window.addEventListener('resize', this.windowSizeUpdated, false)
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.windowSizeUpdated)
   }

   onMouseOver = () => {
      this.setState({ hover: true })
   }

   onMouseOut = () => {
      this.setState({ hover: false })
   }

   windowSizeUpdated = () => {
      const windowSize = getWindowSize()
      this.setState({ size: windowSize })
   }

   render() {
      let activeStyleObj = null
      let buttonLinkObj = null
      let ButtonElement = 'button'
      let modeIcon = null

      // Buttons might be used as a html <button> or <NavLink>
      // navLink is just a boolean. It requires a link to be passed to the link prop
      if (this.props.link) {
         ButtonElement = NavLink
         buttonLinkObj = { to: this.props.link }
      }

      // buttonColorRGB is an Object with r,g,b values
      // Sometimes you want to use the color as is directly,
      // other times when you want to control the Alpha Transparency,
      // you wan to yse the RGBA values
      let buttonColor = this.context.OIOStyles.primaryColor
      let buttonColorRGB = convertColor(buttonColor)

      const buttonClasses = [this.props.className]
      const buttonTextClasses = [style.text]
      const buttonName = this.props.name
      const buttonSize = getAttributeForCurrentSize(this.state.size, this.props.size)

      const buttonStyle = {
         fontFamily: this.context.OIOStyles.fontFamily,
         backgroundColor: buttonColor,
         color: '#fff'
      }

      if (this.props.textClassName) {
         buttonTextClasses.push(this.props.textClassName)
      }

      buttonClasses.push(style[buttonSize])

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
            buttonClasses.push(style[`${buttonSize}IconAndText`])
         } else {
            buttonClasses.push(style[`${buttonSize}IconOnly`])
         }
      }

      // =======================================================
      // Mode
      // =======================================================

      let mode = this.props.mode

      if (this.props.autoFormRespond) {
         const formContext = this.context.OIOForm
         if (this.props.type === 'submit' && formContext) {
            const isPristine = formContext.pristine
            const isSubmitting = formContext.submitting

            if (isPristine) mode = 'disabled'
            else if (isSubmitting) mode = 'loading'

            if (formContext.getErrors().exist) {
               buttonStyle.backgroundColor = 'red'
               mode = 'disabled'
            }
         }
      }

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
         buttonClasses.push(style[`${buttonSize}Rounded`])
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
            buttonStyle.textDecoration = 'underline'
         }
      }

      if (this.props.translucent) {
         buttonClasses.push(style.plain)
         buttonStyle.color = buttonColor
         buttonStyle.backgroundColor =
            `rgba(${buttonColorRGB.r},
            ${buttonColorRGB.g},
            ${buttonColorRGB.b}, 0.20)`

         if (this.state.hover) {
            buttonStyle.backgroundColor =
               `rgba(${buttonColorRGB.r},
               ${buttonColorRGB.g},
               ${buttonColorRGB.b}, 0.35)`
         }
      }

      // =======================================================
      // If Buttons are part of a Button Group
      // =======================================================

      if (this.context.buttonGroup) {
         const buttonGroup = this.context.buttonGroup
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
