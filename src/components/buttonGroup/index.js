import React from 'react'

export default class ButtonGroup extends React.Component {
   static propTypes = {
      align: React.PropTypes.string,
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      spacing: React.PropTypes.number
   }

   static defaultProps = {
      spacing: 6,
      align: 'left'
   }

   static childContextTypes = {
      buttonGroupStyle: React.PropTypes.object
   }

   getChildContext() {
      const buttonGroupStyle = {
         align: this.props.align,
         spacing: `${this.props.spacing}px`
      }

      return { buttonGroupStyle }
   }

   render() {
      const style = {
         float: this.props.align,
         position: 'relative'
      }

      return (
         <div className={this.props.className} style={style}>{this.props.children}</div>
      )
   }
}
