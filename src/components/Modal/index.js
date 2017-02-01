import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import style from './style.less'

export default class Modal extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      height: React.PropTypes.string,
      closeURL: React.PropTypes.string,
      onClose: React.PropTypes.func,
      width: React.PropTypes.string,
      windowClassName: React.PropTypes.string
   }

   static defaultProps = {
      closeURL: '/',
      width: '600',
      height: '600'
   }

   constructor(props) {
      super(props)

      this.hideModal = this.hideModal.bind(this)
   }

   hideModal(event) {
      if (this.props.onClose && this.node === event.target) {
         this.props.onClose()
      }
      // TODO: Below will be used once we figure out how to get browserHistory working correctly
      // Presumeable, the developer can also pass an onClose function as well
      // if (this.node === event.target) {
      //    browserHistory.push(this.props.closeURL)
      // }
   }

   render() {
      const width = parseFloat(this.props.width)
      const height = parseFloat(this.props.height)
      const windowStyles = {
         width: `${width}px`,
         height: `${height}px`,
         marginLeft: `${(width / 2) * -1}px`,
         marginTop: `${(height / 2) * -1}px`
      }

      return (
         <div
            ref={node => (this.node = node)}
            onClick={this.hideModal}
            className={style.modalOverlay}>
            <div
               className={classNames(style.modalWindow, this.props.windowClassName)}
               style={windowStyles}>
               {this.props.children}
            </div>
            <Link to={this.props.closeURL}>
               <div className={classNames('icon', 'ion-ios-close-empty', style.closeButton)} />
            </Link>
         </div>
      )
   }
}
