import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import style from './style.less'

export default class Modal extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      height: React.PropTypes.string,
      closeURL: React.PropTypes.string,
      width: React.PropTypes.string
   }

   static defaultProps = {
      closeURL: '/',
      width: '600',
      height: '600'
   }

   hideModal(event) {
      if (this.node === event.target) {
         console.log(this.props.closeURL)
         browserHistory.push(this.props.closeURL)
      }
   }

   render() {
      const width = this.props.width
      const height = this.props.height
      const windowStyles = {
         width: `${width}px`,
         height: `${height}px`,
         marginLeft: `${(width / 2) * -1}px`,
         marginTop: `${(height / 2) * -1}px`
      }

      return (
         <div
            ref={node => (this.node = node)}
            onClick={event => this.hideModal(event)}
            className={style.modalOverlay}>
            <div className={style.modalWindow} style={windowStyles}>
               {this.props.children}
            </div>
         </div>
      )
   }
}
