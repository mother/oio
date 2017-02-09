import React, { Component } from 'react'

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

   static childContextTypes = {
      buttonGroupStyle: React.PropTypes.object
   }

   getChildContext() {
      const buttonGroupStyle = {
         align: this.props.align,
         mode: this.props.mode,
         spacing: `${this.props.spacing}px`
      }

      return { buttonGroupStyle }
   }

   render() {
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

      return (
         <div className={this.props.className} style={style}>{this.props.children}</div>
      )
   }
}
