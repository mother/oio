import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import { getWindowSize, getAttributeForCurrentSize } from '../../utils/size'
import styles from './styles.less'

export default class View extends Component {
   static propTypes = {
      id: PropTypes.string,
      align: PropTypes.string,
      aspectRatio: PropTypes.string,
      bottom: PropTypes.string,
      children: PropTypes.node,
      className: PropTypes.string,
      format: PropTypes.string,
      height: PropTypes.string,
      left: PropTypes.string,
      minHeight: PropTypes.string,
      maxHeight: PropTypes.string,
      maxWidth: PropTypes.string,
      onScroll: PropTypes.func,
      padding: PropTypes.string,
      paddingTop: PropTypes.string,
      paddingRight: PropTypes.string,
      paddingBottom: PropTypes.string,
      paddingLeft: PropTypes.string,
      position: PropTypes.string,
      right: PropTypes.string,
      scroll: PropTypes.string,
      style: PropTypes.object,
      textAlign: PropTypes.string,
      top: PropTypes.string,
      width: PropTypes.string,
      visible: PropTypes.string
   }

   static defaultProps = {
      format: 'float',
      padding: '0',
      style: {},
      visible: 'on'
   }

   constructor(props) {
      super(props)

      this.state = {
         size: getWindowSize(),
         positionStyles: {},

         // currentWidth and currentHeight represent the width and height
         // of this component at the current size, whereas width and height
         // represent the actual prop strings that were passed in (with
         // responsive instructions)
         currentWidth: 'auto',
         currentHeight: 'auto',

         // Passed in props
         aspectRatio: props.aspectRatio,
         position: props.position,
         width: props.width,
         height: props.height
      }
   }

   componentWillMount() {
      if (this.state.width) {
         const width = getAttributeForCurrentSize(this.state.size, this.state.width)
         if (width) {
            this.setState({ currentWidth: width })
         }
      }
   }

   componentDidMount() {
      this.updateComponentSizeAndPosition()
      window.addEventListener('resize', this.windowSizeUpdated, false)
   }

   // TODO: Untested
   componentWillReceiveProps(nextProps) {
      const stateModifier = {};
      ['aspectRatio', 'position', 'height', 'width'].forEach((key) => {
         if (nextProps[key] && nextProps[key] !== this.state[key]) {
            stateModifier[key] = nextProps[key]
         }
      })

      // Even if nothing has changed, we force a re-render since
      // this may have been triggered by a state change in the parent
      // component. And since the parent component's state has an
      // impact on width and aspect ratio, it could therefore change
      // this component's width and aspect ratio as well.
      // TODO: Check if an ancestor view has changed in a relevant way
      // in order to not render unecessarily.
      this.setState(stateModifier, () => {
         this.updateComponentSizeAndPosition()
      })
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.windowSizeUpdated)
   }

   updateComponentSizeAndPosition() {
      const stateModifier = {}
      let aspectRatio
      let height
      let width

      if (this.state.aspectRatio) {
         aspectRatio = getAttributeForCurrentSize(this.state.size, this.state.aspectRatio)
      }

      if (this.state.height) {
         height = getAttributeForCurrentSize(this.state.size, this.state.height)
         if (height) {
            stateModifier.currentHeight = height
         }
      }

      if (this.state.width) {
         width = getAttributeForCurrentSize(this.state.size, this.state.width)
         if (width) {
            stateModifier.currentWidth = width
         }
      }

      if (aspectRatio) {
         const aspectRatioDimensions = aspectRatio.split(':')
         const aspectRatioWidth = aspectRatioDimensions[0]
         const aspectRatioHeight = aspectRatioDimensions[1]
         const viewWidth = this.node.offsetWidth
         const viewHeight = `${Math.round((viewWidth / aspectRatioWidth) * aspectRatioHeight)}px`

         if (viewWidth > 0) stateModifier.currentHeight = viewHeight
         else stateModifier.currentHeight = 'auto'
      } else if (height) {
         stateModifier.currentHeight = height
      } else {
         stateModifier.currentHeight = 'auto'
      }

      if (Object.keys(stateModifier).length > 0) {
         this.setState(stateModifier, this.updatePositionStyles)
      } else {
         this.updatePositionStyles()
      }
   }

   updatePositionStyles() {
      const positionStyles = {}

      if (this.state.position) {
         const currentPosition = getAttributeForCurrentSize(this.state.size, this.state.position)

         if (currentPosition.includes('top')) {
            positionStyles.top = 0
            positionStyles.bottom = 'auto'
         }

         if (currentPosition.includes('middle')) {
            positionStyles.top = '50%'
            if (this.state.currentHeight !== 'auto') {
               positionStyles.marginTop = `-${Math.floor(this.node.offsetHeight / 2)}px`
            }
         }

         if (currentPosition.includes('bottom')) {
            positionStyles.bottom = 0
            positionStyles.top = 'auto'
         }

         if (currentPosition.includes('left')) {
            positionStyles.left = '0'
            positionStyles.right = 'auto'
            positionStyles.marginLeft = 'auto'
         }

         if (currentPosition.includes('center')) {
            positionStyles.left = '50%'
            if (this.state.currentWidth !== 'auto') {
               positionStyles.marginLeft = `-${this.node.offsetWidth / 2}px`
            }
         }

         if (currentPosition.includes('right')) {
            positionStyles.right = '0'
            positionStyles.left = 'auto'
         }
      }

      this.setState({ positionStyles })
   }

   windowSizeUpdated = () => {
      const windowSize = getWindowSize()
      this.setState({ size: windowSize }, () => {
         this.updateComponentSizeAndPosition()
      })
   }

   render() {
      const viewClasses = [styles.view]
      const currentSizeStyles = {}

      // Add Pre-Defined Classes

      if (this.props.scroll) {
         const scroll = getAttributeForCurrentSize(this.state.size, this.props.scroll)
         if (scroll && scroll === 'on') {
            viewClasses.push(styles.scroll)
         }
      }

      if (this.props.visible) {
         const visible = getAttributeForCurrentSize(this.state.size, this.props.visible)
         if (visible && visible === 'on') {
            viewClasses.push(styles.visible)
         } else {
            viewClasses.push(styles.hidden)
         }
      }

      if (this.props.format) {
         const format = getAttributeForCurrentSize(this.state.size, this.props.format)
         if (format === 'float') {
            viewClasses.push(styles.floatFormat)
         } else if (format === 'auto') {
            viewClasses.push(styles.autoFormat)
         }
      }

      // Add Inline Styles

      if (this.props.align) {
         const align = getAttributeForCurrentSize(this.state.size, this.props.align)
         if (align) currentSizeStyles.float = align
      }

      if (this.props.padding) {
         const padding = getAttributeForCurrentSize(this.state.size, this.props.padding)
         if (padding !== 0) currentSizeStyles.padding = padding
      }

      if (this.props.paddingTop) {
         const paddingTop = getAttributeForCurrentSize(this.state.size, this.props.paddingTop)
         if (paddingTop !== 0) currentSizeStyles.paddingTop = paddingTop
      }

      if (this.props.paddingRight) {
         const paddingRight = getAttributeForCurrentSize(this.state.size, this.props.paddingRight)
         if (paddingRight !== 0) currentSizeStyles.paddingRight = paddingRight
      }

      if (this.props.paddingBottom) {
         const paddingBottom = getAttributeForCurrentSize(this.state.size, this.props.paddingBottom)
         if (paddingBottom !== 0) currentSizeStyles.paddingBottom = paddingBottom
      }

      if (this.props.paddingLeft) {
         const paddingLeft = getAttributeForCurrentSize(this.state.size, this.props.paddingLeft)
         if (paddingLeft !== 0) currentSizeStyles.paddingLeft = paddingLeft
      }

      if (this.props.maxHeight) {
         const maxHeight = getAttributeForCurrentSize(this.state.size, this.props.maxHeight)
         if (maxHeight) currentSizeStyles.maxHeight = maxHeight
      }

      if (this.props.maxWidth) {
         const maxWidth = getAttributeForCurrentSize(this.state.size, this.props.maxWidth)
         if (maxWidth) currentSizeStyles.maxWidth = maxWidth
      }

      if (this.props.minHeight) {
         const minHeight = getAttributeForCurrentSize(this.state.size, this.props.minHeight)
         if (minHeight) currentSizeStyles.minHeight = minHeight
      }

      if (this.props.textAlign) {
         const textAlign = getAttributeForCurrentSize(this.state.size, this.props.textAlign)
         if (textAlign) currentSizeStyles.textAlign = textAlign
      }

      if (this.props.top) {
         const top = getAttributeForCurrentSize(this.state.size, this.props.top)
         if (top) {
            const unit = top.endsWith('px') ? 'px' : '%'
            currentSizeStyles.top = parseFloat(top) + unit
         }
      }

      if (this.props.left) {
         const left = getAttributeForCurrentSize(this.state.size, this.props.left)
         if (left) {
            const unit = left.endsWith('px') ? 'px' : '%'
            currentSizeStyles.left = parseFloat(left) + unit
         }
      }

      if (this.props.right) {
         const right = getAttributeForCurrentSize(this.state.size, this.props.right)
         if (right) {
            const unit = right.endsWith('px') ? 'px' : '%'
            currentSizeStyles.right = parseFloat(right) + unit
         }
      }

      if (this.props.bottom) {
         const bottom = getAttributeForCurrentSize(this.state.size, this.props.bottom)
         if (bottom) {
            const unit = bottom.endsWith('px') ? 'px' : '%'
            currentSizeStyles.bottom = parseFloat(bottom) + unit
         }
      }

      // Aggregate inline styles

      const style = {
         ...this.props.style,
         ...currentSizeStyles,
         ...this.state.positionStyles,
         width: this.state.currentWidth,
         height: this.state.currentHeight
      }

      if (style.height === 'auto') {
         delete style.height
      }

      return (
         <div
            id={this.props.id}
            ref={node => (this.node = node)}
            style={style}
            onScroll={this.props.onScroll}
            className={classNames(viewClasses, this.props.className)}>
            {this.props.children}
         </div>
      )
   }
}
