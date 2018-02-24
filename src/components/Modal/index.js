import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { getWindowSize, getAttributeForCurrentSize } from '../../utils/size'
import Icon from '../Icon'
import View from '../View'
import style from './style.less'

export default class Modal extends Component {
   static propTypes = {
      animation: PropTypes.oneOf(['scaleIn', 'slideFromBottom']).isRequired,
      children: PropTypes.node,
      height: PropTypes.string,
      closeURL: PropTypes.string,
      mode: PropTypes.string,
      onClose: PropTypes.func,
      width: PropTypes.string,
      windowClassName: PropTypes.string,
      windowMargin: PropTypes.string,
      zIndex: PropTypes.string.isRequired
   }

   static defaultProps = {
      animation: 'scaleIn',
      closeURL: '/',
      mode: 'fixed',
      width: '600px',
      height: '600px',
      windowMargin: '0px',
      zIndex: '900'
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
      if (this.props.onClose &&
         (event.target === this.overlay || event.target === this.closeButton)) {
         this.props.onClose()
      }
      // TODO: Below will be used once we figure out how to get history as
      // browserHistory working correctly
      // Presumeable, the developer can also pass an onClose function as well
      // if (this.overlay === event.target) {
      //    browserHistory.push(this.props.closeURL)
      // }
   }

   render() {
      const { animation, children, closeURL, onClose, zIndex, windowClassName } = this.props
      const size = this.state.size
      const width = getAttributeForCurrentSize(size, this.props.width)
      const height = getAttributeForCurrentSize(size, this.props.height)
      const mode = getAttributeForCurrentSize(size, this.props.mode)
      const modalWindowMargin = getAttributeForCurrentSize(size, this.props.windowMargin)
      const modalWindowStyle = {}

      const modalOverlayStyle = {
         padding: modalWindowMargin,
         zIndex
      }

      const modalWindowClasses = [
         style.modalWindow,
         style[animation],
         windowClassName
      ]

      if (mode === 'fixed') {
         modalWindowStyle.width = width
         modalWindowStyle.height = height

         if (this.state.position === 'middleCenter') {
            if (width.endsWith('%')) {
               modalWindowStyle.left = `${((100 - parseFloat(width)) / 2)}%`
            } else {
               modalWindowStyle.marginLeft = `${(parseFloat(width) / 2) * -1}px`
            }

            if (height.endsWith('%')) {
               modalWindowStyle.top = `${((100 - parseFloat(height)) / 2)}%`
            } else {
               modalWindowStyle.marginTop = `${(parseFloat(height) / 2) * -1}px`
            }
            modalWindowClasses.push(style.positionAtMiddleAndCenter)
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

      const closeButtonIcon = (
         <View
            position="top right"
            padding="0px[a-c] 6px[d] 24px[e]"
            className={style.closeButtonContainer}
            style={{ cursor: 'pointer', zIndex: zIndex + 1 }}>
            <div className={style.closeButtonIcon}>
               <Icon name="ion-ios-close-empty" />
               <div
                  onClick={onClose}
                  ref={(closeButton) => { this.closeButton = closeButton }}
                  className={style.hitArea}
               />
            </div>
         </View>
      )

      return (
         <div
            ref={(overlay) => { this.overlay = overlay }}
            onClick={this.hideModal}
            className={style.modalOverlay}
            style={modalOverlayStyle}>
            <div
               className={classNames(modalWindowClasses)}
               style={modalWindowStyle}>
               {children}
            </div>
            {onClose && closeButtonIcon}
            {!onClose && closeURL && (
               <Link to={closeURL}>{closeButtonIcon}</Link>
            )}
         </div>
      )
   }
}
