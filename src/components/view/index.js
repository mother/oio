import React from 'react'
import classNames from 'classnames'
import { getWindowSize, getAttributeForCurrentSize } from '../../utils/sizeUtils'
import styles from './styles.less'

export default class View extends React.Component {
   static propTypes = {
      align: React.PropTypes.string,
      aspectRatio: React.PropTypes.string,
      bottom: React.PropTypes.string,
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      format: React.PropTypes.string,
      height: React.PropTypes.string,
      left: React.PropTypes.string,
      maxWidth: React.PropTypes.string,
      onScroll: React.PropTypes.func,
      padding: React.PropTypes.string,
      position: React.PropTypes.string,
      right: React.PropTypes.string,
      scroll: React.PropTypes.string,
      style: React.PropTypes.object,
      textAlign: React.PropTypes.string,
      top: React.PropTypes.string,
      width: React.PropTypes.string,
      visible: React.PropTypes.string
   }

   static defaultProps = {
      format: 'float',
      padding: '0',
      style: {},
      visible: 'on',
      width: 'auto'
   }

   constructor(props, context) {
      super(props, context)

      this.state = {
         aspectRatio: props.aspectRatio,
         width: props.width,
         height: props.height,
         position: props.position,
         size: getWindowSize(),
         positionStyles: {}
      }

      this.windowSizeUpdated = this.windowSizeUpdated.bind(this)
   }

   componentDidMount() {
      this.updateComponentSize()
      this.updatePositionStyles()
      window.addEventListener('resize', this.windowSizeUpdated, false)
   }

   componentWillReceiveProps(newProps) {
      const updateRequired = ['aspectRatio', 'position', 'height', 'width'].some(key => (
         newProps[key] !== this.state[key]
      ))

      if (updateRequired) {
         this.updateComponentSize()
         this.updatePositionStyles()
      }
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.windowSizeUpdated)
   }

   updateComponentSize() {
      const stateModifier = {}
      let aspectRatio
      let height
      let width

      if (this.state.aspectRatio) {
         aspectRatio = getAttributeForCurrentSize(this.state.size, this.state.aspectRatio)
      }

      if (this.state.width) {
         width = getAttributeForCurrentSize(this.state.size, this.state.width)
         if (width) {
            const unit = width.endsWith('px') ? 'px' : '%'
            stateModifier.width = parseFloat(width) + unit
         }
      }

      if (this.state.height) {
         height = getAttributeForCurrentSize(this.state.size, this.state.height)
         if (height) {
            const unit = height.endsWith('px') ? 'px' : '%'
            stateModifier.height = parseFloat(height) + unit
         }
      // Will only execute aspect ratio if no height exists
      // Height takes precedence in setting View size
      } else if (aspectRatio && !height) {
         const aspectRatioDimensions = aspectRatio.split(':')
         const aspectRatioWidth = aspectRatioDimensions[0]
         const aspectRatioHeight = aspectRatioDimensions[1]
         const viewWidth = this.node.offsetWidth
         const viewHeight = `${Math.round((viewWidth / aspectRatioWidth) * aspectRatioHeight)}px`

         if (this.state.height !== viewHeight) {
            stateModifier.height = viewHeight
         }
      }

      if (Object.keys(stateModifier).length > 0) {
         this.setState(stateModifier)
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
            if (this.state.height !== 'auto') {
               positionStyles.marginTop = `-${this.node.offsetHeight / 2}px`
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
            if (this.state.width !== 'auto') {
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

   windowSizeUpdated() {
      const windowSize = getWindowSize()
      this.setState({ size: windowSize })
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

      if (this.props.maxWidth) {
         const maxWidth = getAttributeForCurrentSize(this.state.size, this.props.maxWidth)
         if (maxWidth) currentSizeStyles.maxWidth = maxWidth
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
         width: this.state.width,
         height: this.state.height
      }

      return (
         <div
            ref={node => (this.node = node)}
            style={style}
            onScroll={this.props.onScroll}
            className={classNames(viewClasses, this.props.className)}>
            {this.props.children}
         </div>
      )
   }
}
