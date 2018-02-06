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
      if (this.props.onClose && this.node === event.target) {
         this.props.onClose()
      }
      // TODO: Below will be used once we figure out how to get history as
      // browserHistory working correctly
      // Presumeable, the developer can also pass an onClose function as well
      // if (this.node === event.target) {
      //    browserHistory.push(this.props.closeURL)
      // }
   }

   render() {
      const { animation, children, closeURL, zIndex, windowClassName } = this.props
      const size = this.state.size
      const width = parseFloat(getAttributeForCurrentSize(size, this.props.width))
      const height = parseFloat(getAttributeForCurrentSize(size, this.props.height))
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
               {children}
            </div>
            <Link to={closeURL}>
               <View
                  position="top right"
                  padding="0px[a-c] 6px[d] 24px[e]"
                  className={style.closeButtonContainer}
                  style={{ zIndex: zIndex + 1 }}>
                  <Icon name="ion-ios-close-empty" className={style.closeButton} />
               </View>
            </Link>
         </div>
      )
   }
}
