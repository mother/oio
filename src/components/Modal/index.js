import React, { Component } from 'react'
import style from './style.less'

export default class Modal extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      height: React.PropTypes.string,
      // closeURL: React.PropTypes.string,
      onClose: React.PropTypes.func,
      width: React.PropTypes.string
   }

   static defaultProps = {
      closeURL: '/',
      width: '600',
      height: '600'
   }

   hideModal(event) {
      if (this.props.onClose && this.node === event.target) {
         this.props.onClose()
      }
      // TODO: Below will be used once we figure out how to get browserHistory working correctly
      // if (this.node === event.target) {
      //    browserHistory.push(this.props.closeURL)
      // }
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

      console.log(windowStyles)

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
