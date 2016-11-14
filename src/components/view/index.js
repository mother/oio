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
      onScroll: React.PropTypes.func,
      padding: React.PropTypes.string,
      scroll: React.PropTypes.string,
      width: React.PropTypes.string,
      visible: React.PropTypes.string
   }

   static defaultProps = {
      format: 'float',
      visible: 'on'
   }

   constructor(props, context) {
      super(props, context)

      this.state = {
         size: getWindowSize(),
         width: 'auto',
         height: 'auto',
         padding: '0'
      }

      this.windowSizeUpdated = this.windowSizeUpdated.bind(this)
   }

   componentDidMount() {
      this.setComponentAspectRatio()

      window.addEventListener('resize', this.windowSizeUpdated, false)
   }

   componentDidUpdate() {
      this.setComponentAspectRatio()
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

   windowSizeUpdated() {
      const windowSize = getWindowSize()
      this.setState({ size: windowSize })
   }

   render() {
      const viewClasses = [styles.view]

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

      if (this.props.padding) {
         const padding = getAttributeForCurrentSize(this.state.size, this.props.padding)
         if (padding) this.state.padding = padding
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

      viewClasses.push(this.props.className)

      const style = {
         width: this.state.width,
         height: this.state.height,
         padding: this.state.padding
      }

      return (
         <div
            ref={node => (this.node = node)}
            style={style}
            onScroll={this.props.onScroll}
            className={classNames(viewClasses)}>
            {this.props.children}
         </div>
      )
   }
}
