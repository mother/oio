import React from 'react'

export default class UIBtnGroup extends React.Component {
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
      btnGroupStyle: React.PropTypes.object
   }

   getChildContext() {
      const btnGroupStyle = {
         align: this.props.align,
         spacing: `${this.props.spacing}px`
      }

      return { btnGroupStyle }
   }

   render() {
      const style = {
         float: this.props.align
      }

      return (
         <div className={this.props.className} style={style}>{this.props.children}</div>
      )
   }
}
