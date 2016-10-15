import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'

export default class GridCell extends React.Component {
   static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      colspan: React.PropTypes.string,
      gutter: React.PropTypes.string,
      width: React.PropTypes.string
   }

   static contextTypes = {
      GridCellStyle: React.PropTypes.object
   }

   constructor(props, context) {
      super(props, context)

      this.state = {
         size: this.getWindowSize(),
         width: '0',
         gutter: '0'
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
      const classes = classNames(styles.gridCell, this.props.className)

      if (this.context.GridCellStyle) {
         this.state.width = `${this.context.GridCellStyle.width}px`
         this.state.gutter = `${this.context.GridCellStyle.gutter}`
      }

      const gutter = parseFloat(this.state.gutter)
      const width = parseFloat(this.state.width)

      const cellStyle = {
         width: `${width}px`,
         paddingLeft: `${gutter}px`,
         marginBottom: `${gutter}px`
      }

      return (
         <div className={classes} style={cellStyle} >
            <div className={styles.gridCellInner}>
               {this.props.children}
            </div>
         </div>
      )
   }
}
