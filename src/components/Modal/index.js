import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getWindowSize, getAttributeForCurrentSize } from '../../utils/size'
import Icon from '../Icon'
import style from './style.less'

export default class Modal extends Component {
   static propTypes = {
      animation: React.PropTypes.oneOf(['scaleIn', 'slideFromBottom']),
      children: React.PropTypes.node,
      height: React.PropTypes.string,
      closeURL: React.PropTypes.string,
      mode: React.PropTypes.string,
      onClose: React.PropTypes.func,
      width: React.PropTypes.string,
      windowClassName: React.PropTypes.string,
      windowMargin: React.PropTypes.string
   }

   static defaultProps = {
      animation: 'scaleIn',
      closeURL: '/',
      mode: 'fixed',
      width: '600',
      height: '600',
      windowMargin: '0px'
   }

   constructor(props) {
      super(props)

      this.state = {
         position: 'middleCenter',
         size: getWindowSize()
      }
   }

   componentDidMount() {
      this.windowSizeUpdated()
      window.addEventListener('resize', this.windowSizeUpdated, false)
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.windowSizeUpdated)
   }

   windowSizeUpdated = () => {
      const browserWindowHeight = document.documentElement.clientHeight
      const modalHeight = parseFloat(this.props.height)
      const windowSize = getWindowSize()
      const stateObj = { size: windowSize }

      if (modalHeight > browserWindowHeight) {
         stateObj.position = 'topCenter'
      }

      this.setState(stateObj)
   }

   hideModal = (event) => {
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
      const size = this.state.size
      const width = parseFloat(getAttributeForCurrentSize(size, this.props.width))
      const height = parseFloat(getAttributeForCurrentSize(size, this.props.height))
      const mode = getAttributeForCurrentSize(size, this.props.mode)
      const modalWindowMargin = getAttributeForCurrentSize(size, this.props.windowMargin)
      const modalWindowStyle = {}

      const modalOverlayStyle = {
         padding: modalWindowMargin
      }

      const modalWindowClasses = [
         style.modalWindow,
         style[this.props.animation],
         this.props.windowClassName
      ]

      if (mode === 'fixed') {
         modalWindowStyle.width = `${width}px`
         modalWindowStyle.height = `${height}px`

         if (this.state.position === 'middleCenter') {
            modalWindowClasses.push(style.positionAtMiddleAndCenter)
            modalWindowStyle.marginTop = `${(height / 2) * -1}px`
            modalWindowStyle.marginLeft = `${(width / 2) * -1}px`
         } else if (this.state.position === 'topCenter') {
            modalWindowClasses.push(style.positionAtTopCenter)
         }
      } else if (mode === 'fill') {
         modalWindowClasses.push(style.positionFill)
         modalWindowStyle.top = modalWindowMargin
         modalWindowStyle.left = modalWindowMargin
         modalWindowStyle.right = modalWindowMargin
         modalWindowStyle.bottom = modalWindowMargin
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
