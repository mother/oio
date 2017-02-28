import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import Icon from '../Icon'
import style from './style.less'

export default class Modal extends Component {
   static propTypes = {
      animation: React.PropTypes.string,
      children: React.PropTypes.node,
      height: React.PropTypes.string,
      closeURL: React.PropTypes.string,
      onClose: React.PropTypes.func,
      width: React.PropTypes.string,
      windowClassName: React.PropTypes.string,
      windowMargin: React.PropTypes.string
   }

   static defaultProps = {
      animation: 'scaleIn',
      closeURL: '/',
      width: '600',
      height: '600',
      windowMargin: '0px'
   }

   constructor(props) {
      super(props)

      this.hideModal = this.hideModal.bind(this)
      this.windowSizeUpdated = this.windowSizeUpdated.bind(this)
      this.state = {
         positionClassName: 'positionAtMiddleAndCenter',
         modalWindowMargin: props.windowMargin
      }
   }

   componentDidMount() {
      this.windowSizeUpdated()
      window.addEventListener('resize', this.windowSizeUpdated, false)
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.windowSizeUpdated)
   }

   windowSizeUpdated() {
      const browserWindowHeight = document.documentElement.clientHeight
      const modalHeight = parseFloat(this.props.height)

      if (modalHeight > browserWindowHeight) {
         this.setState({
            positionClassName: 'positionAtTopCenter'
         })
      }
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

      const modalOverlayStyle = {
         padding: this.state.modalWindowMargin
      }

      const modalWindowClasses = [
         style.modalWindow,
         style[this.state.positionClassName],
         style[this.props.animation],
         this.props.windowClassName
      ]

      const modalWindowStyle = {
         width: `${width}px`,
         height: `${height}px`
      }

      if (this.state.positionClassName === 'positionAtMiddleAndCenter') {
         modalWindowStyle.marginTop = `${(height / 2) * -1}px`
         modalWindowStyle.marginLeft = `${(width / 2) * -1}px`
      }

      return (
         <div
            ref={node => (this.node = node)}
            onClick={this.hideModal}
            className={style.modalOverlay}
            style={modalOverlayStyle}>
            <div
               className={classNames(modalWindowClasses)}
               style={modalWindowStyle}>
               {this.props.children}
            </div>
            <Link to={this.props.closeURL}>
               <Icon name="ion-ios-close-empty" className={style.closeButton} />
            </Link>
         </div>
      )
   }
}
