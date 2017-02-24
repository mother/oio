import React, { Component } from 'react'
import convertColor from '../../utils/convertColor'

export default class ButtonGroup extends Component {
   static propTypes = {
      align: React.PropTypes.string,
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      mode: React.PropTypes.string,
      spacing: React.PropTypes.number
   }

   static defaultProps = {
      align: 'left',
      mode: 'normal',
      spacing: 6
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
   }

   static childContextTypes = {
      buttonGroupStyle: React.PropTypes.object
   }

   getChildContext() {
      const buttonSpacing = (this.props.mode === 'list' || this.props.mode === 'segmented')
         ? 0
         : this.props.spacing

      const buttonGroupStyle = {
         align: this.props.align,
         mode: this.props.mode,
         spacing: `${buttonSpacing}px`
      }

      return { buttonGroupStyle }
   }

   render() {
      let buttonColor = this.context.OIOStyles.primaryColor
      let buttonColorRGB = convertColor(buttonColor)

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
         style.border = `2px solid
            rgba(${buttonColorRGB.r},
            ${buttonColorRGB.g},
            ${buttonColorRGB.b}, 1)`
         style.borderRadius = '3px'
      }

      return (
         <div className={this.props.className} style={style}>{this.props.children}</div>
      )
   }
}
