import React from 'react'
import classNames from 'classnames'

import styles from './styles.less'

export default class UIGridCell extends React.Component {
   static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      colspan: React.PropTypes.string,
      gutter: React.PropTypes.string,
      width: React.PropTypes.string
   }

   constructor(props, context) {
      super(props, context)

      this.state = {
         size: this.getWindowSize(),
         width: 'auto',
         gutter: 'auto'
      }

      this.windowResizeListener = this.windowSizeUpdated.bind(this)
   }

   componentDidMount() {
      window.addEventListener('resize', this.windowResizeListener, false)
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.windowResizeListener)
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

   windowSizeUpdated() {
      const windowSize = this.getWindowSize()
      this.setState({ size: windowSize })
   }

   render() {
      let gutter = 0
      let colspanMultiplier = 1
      const classes = classNames(styles.uiGridCell, this.props.className)

      // Width is set by UIGrid (for now)
      if (this.props.width) {
         const width = this.props.width

         if (this.props.colspan) {
            colspanMultiplier = this.getAttributeForCurrentSize(this.props.colspan)
         }

         if (width) {
            const unit = width.indexOf('px') === -1 ? '%' : 'px'
            this.state.width = (parseFloat(width) * colspanMultiplier) + unit
         }
      }

      // Gutter is set by UIGrid (for now)
      if (this.props.gutter) {
         const unit = this.props.gutter.indexOf('px') === -1 ? '%' : 'px'
         gutter = parseFloat(this.props.gutter) + unit
      }

      const cellStyle = {
         width: this.state.width,
         paddingRight: gutter,
         marginBottom: gutter
      }

      return (
         <div className={classes} style={cellStyle} >
            <div className={styles.uiGridCellInner}>
               {this.props.children}
            </div>
         </div>
      )
   }
}
