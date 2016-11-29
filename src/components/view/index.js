import React from 'react'
import classNames from 'classnames'
import { getWindowSize, getAttributeForCurrentSize } from '../../utils/sizeUtils'
import styles from './styles.less'

export default class View extends React.Component {
   static propTypes = {
      aspectRatio: React.PropTypes.string,
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      format: React.PropTypes.string,
      height: React.PropTypes.string,
      maxWidth: React.PropTypes.string,
      onScroll: React.PropTypes.func,
      padding: React.PropTypes.string,
      position: React.PropTypes.string,
      scroll: React.PropTypes.string,
      style: React.PropTypes.object,
      textAlign: React.PropTypes.string,
      width: React.PropTypes.string,
      visible: React.PropTypes.string
   }

   static defaultProps = {
      format: 'float',
      padding: '0',
      style: {},
      visible: 'on'
   }

   constructor(props, context) {
      super(props, context)

      this.state = {
         width: 'auto',
         height: 'auto',
         position: {},
         size: getWindowSize()
      }

      this.windowSizeUpdated = this.windowSizeUpdated.bind(this)
   }

   componentDidMount() {
      this.setComponentAspectRatio()
      this.setComponentPosition()

      window.addEventListener('resize', this.windowSizeUpdated, false)
   }

   componentDidUpdate() {
      this.setComponentAspectRatio()
      this.setComponentPosition()
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.windowSizeUpdated)
   }

   setComponentAspectRatio() {
      let aspectRatio
      let height

      if (this.props.aspectRatio) {
         aspectRatio = getAttributeForCurrentSize(this.state.size, this.props.aspectRatio)
      }

      if (this.props.height) {
         height = getAttributeForCurrentSize(this.state.size, this.props.height)
      }

      // Will only execute aspect ratio if no height exists
      // Height takes precedence in setting View size
      if (aspectRatio && !height) {
         const aspectRatioDimensions = aspectRatio.split(':')
         const aspectRatioWidth = aspectRatioDimensions[0]
         const aspectRatioHeight = aspectRatioDimensions[1]
         const viewWidth = this.node.offsetWidth
         const viewHeight = `${Math.round((viewWidth / aspectRatioWidth) * aspectRatioHeight)}px`

         if (this.state.height !== viewHeight) {
            this.setState({ height: viewHeight })
         }
      }
   }

   setComponentPosition() {
      const position = {}
      if (this.props.position) {
         const currentPosition = getAttributeForCurrentSize(this.state.size, this.props.position)

         if (currentPosition.indexOf('top') >= 0) {
            position.top = 0
            position.bottom = 'auto'
         }

         if (currentPosition.indexOf('middle') >= 0) {
            position.top = '50%'
            if (this.state.height !== 'auto') {
               position.marginTop = `-${this.node.offsetHeight / 2}px`
            }
         }

         if (currentPosition.indexOf('bottom') >= 0) {
            position.bottom = 0
            position.top = 'auto'
         }

         if (currentPosition.indexOf('left') >= 0) {
            position.left = '0'
            position.right = 'auto'
            position.marginLeft = 'auto'
         }

         if (currentPosition.indexOf('center') >= 0) {
            position.left = '50%'
            if (this.state.width !== 'auto') {
               position.marginLeft = `-${this.node.offsetWidth / 2}px`
            }
         }

         if (currentPosition.indexOf('right') >= 0) {
            position.right = '0'
            position.left = 'auto'
         }

         // Not sure if there is a better way to do this equality comparison
         if (JSON.stringify(this.state.position) !== JSON.stringify(position)) {
            this.setState({ position })
         }
      }
   }

   windowSizeUpdated() {
      const windowSize = getWindowSize()
      this.setState({ size: windowSize })
   }

   render() {
      const viewClasses = [styles.view]
      const statelessStyles = {}

      // Stateless View Props
      const padding = getAttributeForCurrentSize(this.state.size, this.props.padding)
      if (padding !== 0) statelessStyles.padding = padding

      if (this.props.maxWidth) {
         const maxWidth = getAttributeForCurrentSize(this.state.size, this.props.maxWidth)
         if (maxWidth) statelessStyles.maxWidth = maxWidth
      }

      if (this.props.textAlign) {
         const textAlign = getAttributeForCurrentSize(this.state.size, this.props.textAlign)
         if (textAlign) statelessStyles.textAlign = textAlign
      }

      // Stateful View Styles
      if (this.props.width) {
         const width = getAttributeForCurrentSize(this.state.size, this.props.width)
         if (width) {
            const unit = width.indexOf('px') === -1 ? '%' : 'px'
            this.state.width = parseFloat(width) + unit
         }
      }

      if (this.props.height) {
         const height = getAttributeForCurrentSize(this.state.size, this.props.height)
         if (height) {
            const unit = height.indexOf('px') === -1 ? '%' : 'px'
            this.state.height = parseFloat(height) + unit
         }
      }

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

      const style = {
         ...this.props.style,
         ...statelessStyles,
         ...this.state.position,
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
