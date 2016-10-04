import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'

export default class View extends React.Component {
   static propTypes = {
      aspectRatio: React.PropTypes.string,
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      format: React.PropTypes.string,
      height: React.PropTypes.string,
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
         size: this.getWindowSize(),
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

   getAttributeForCurrentSize(attributeValue) {
      const currentSize = this.state.size
      const fragments = attributeValue.split(' ')

      for (const fragment of fragments) {
         const charSet = fragment.match(/\[([abcdef,-]+)\]/i)
         if (Array.isArray(charSet) && charSet.length === 2) {
            const charRegexp = new RegExp(`[${charSet[1]}]`, 'i')
            const match = currentSize.match(charRegexp)
            if (Array.isArray(match)) {
               return fragment.replace(charSet[0], '')
            }
         } else {
            return fragment
         }
      }

      return null
   }

   getWindowSize() {
      const windowWidth = document.documentElement.clientWidth

      if (windowWidth >= 1650) {
         return 'e'
      } else if (windowWidth >= 1300) {
         return 'd'
      } else if (windowWidth >= 992) {
         return 'c'
      } else if (windowWidth >= 768) {
         return 'b'
      } else if (windowWidth >= 0) {
         return 'a'
      }

      return null
   }

   setComponentAspectRatio() {
      let aspectRatio
      let height

      if (this.props.aspectRatio) {
         aspectRatio = this.getAttributeForCurrentSize(this.props.aspectRatio)
      }

      if (this.props.height) {
         height = this.getAttributeForCurrentSize(this.props.height)
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
      const windowSize = this.getWindowSize()
      this.setState({ size: windowSize })
   }

   render() {
      const viewClasses = [styles.uiView]

      if (this.props.width) {
         const width = this.getAttributeForCurrentSize(this.props.width)
         if (width) {
            const unit = width.indexOf('px') === -1 ? '%' : 'px'
            this.state.width = parseFloat(width) + unit
         }
      }

      if (this.props.height) {
         const height = this.getAttributeForCurrentSize(this.props.height)
         if (height) {
            const unit = height.indexOf('px') === -1 ? '%' : 'px'
            this.state.height = parseFloat(height) + unit
         }
      }

      if (this.props.padding) {
         const padding = this.getAttributeForCurrentSize(this.props.padding)
         if (padding) {
            const unit = padding.indexOf('px') === -1 ? '%' : 'px'
            this.state.padding = parseFloat(padding) + unit
         }
      }

      if (this.props.scroll) {
         const scroll = this.getAttributeForCurrentSize(this.props.scroll)
         if (scroll && scroll === 'on') {
            viewClasses.push(styles.scroll)
         }
      }

      if (this.props.visible) {
         const visible = this.getAttributeForCurrentSize(this.props.visible)
         if (visible && visible === 'on') {
            viewClasses.push(styles.visible)
         } else {
            viewClasses.push(styles.hidden)
         }
      }

      if (this.props.format) {
         const format = this.getAttributeForCurrentSize(this.props.format)
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
         <div ref={node => (this.node = node)} style={style} className={classNames(viewClasses)}>
            {this.props.children}
         </div>
      )
   }
}
