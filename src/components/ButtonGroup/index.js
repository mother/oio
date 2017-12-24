import PropTypes from 'prop-types'
import React, { Component } from 'react'
import convertColor from '../../utils/convertColor'

export default class ButtonGroup extends Component {
   static propTypes = {
      align: PropTypes.string,
      children: PropTypes.node,
      className: PropTypes.string,
      mode: PropTypes.string,
      spacing: PropTypes.string
   }

   static defaultProps = {
      align: 'left',
      mode: 'normal',
      spacing: '6px'
   }

   static contextTypes = {
      OIOStyles: PropTypes.object
   }

   static childContextTypes = {
      buttonGroup: PropTypes.object
   }

   getChildContext() {
      const buttonSpacing = (this.props.mode === 'list' || this.props.mode === 'segmented')
         ? 0
         : this.props.spacing

      const buttonGroup = {
         align: this.props.align,
         mode: this.props.mode,
         spacing: `${parseFloat(buttonSpacing)}px`
      }

      return { buttonGroup }
   }

   render() {
      const buttonColor = this.context.OIOStyles.primaryColor
      const buttonColorRGB = convertColor(buttonColor)

      const innerContainerStyle = {}
      const style = {
         float: 'left',
         position: 'relative'
      }

      if (this.props.align === 'center') {
         style.width = '100%'
         style.textAlign = 'center'
      } else {
         style.float = this.props.align
      }

      if (this.props.mode === 'segmented') {
         innerContainerStyle.display = 'inline-block'
         innerContainerStyle.borderRadius = '3px'
         innerContainerStyle.border = `2px solid
            rgba(${buttonColorRGB.r},
            ${buttonColorRGB.g},
            ${buttonColorRGB.b}, 1)`
      }

      if (this.props.mode === 'list') {
         style.width = '100%'
      }

      return (
         <div className={this.props.className} style={style}>
            <span style={innerContainerStyle}>{this.props.children}</span>
         </div>
      )
   }
}
