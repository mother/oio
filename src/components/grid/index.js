import React from 'react'
import classNames from 'classnames'

import style from './style.less'

export default class Grid extends React.Component {
   static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      columns: React.PropTypes.string,
      gutter: React.PropTypes.string,
      width: React.PropTypes.string
   }

   static defaultProps = {
      columns: '12',
      gutter: '6px'
   }

   static childContextTypes = {
      GridCellStyle: React.PropTypes.object
   }

   constructor(props, context) {
      super(props, context)

      this.state = {
         size: this.getWindowSize(),
         width: 'auto',
         innerWidth: '100%',
         cellWidth: 'auto',
         cellGutter: 'auto'
      }

      this.windowSizeUpdated = this.windowSizeUpdated.bind(this)
   }

   getChildContext() {
      const GridCellStyle = {
         width: this.state.cellWidth,
         gutter: this.state.cellGutter
      }

      return { GridCellStyle }
   }

   componentDidMount() {
      this.updateGrid()
      window.addEventListener('resize', this.windowSizeUpdated, false)
   }

   componentDidUpdate() {
      this.updateGrid()
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

   windowSizeUpdated() {
      const windowSize = this.getWindowSize()
      this.setState({ size: windowSize })
   }

   updateGrid() {
      const columns = this.getAttributeForCurrentSize(this.props.columns)
      const gutter = this.getAttributeForCurrentSize(this.props.gutter)

      const calculatedGridWidth = this.node.clientWidth
      const adjustedGridWidth = parseFloat(calculatedGridWidth) + parseFloat(gutter)
      const cellWidth = (adjustedGridWidth) / columns

      if(this.state.innerWidth !== adjustedGridWidth) {
         this.setState({
            innerWidth: adjustedGridWidth
         })
      }

      if (this.state.cellWidth !== cellWidth) {
         this.setState({
            cellWidth: cellWidth,
            cellGutter: gutter
         })
      }
   }

   render() {
      const classes = classNames(style.gridContainer, this.props.className)
      const gutter = parseFloat(this.getAttributeForCurrentSize(this.props.gutter))

      if (this.props.width) {
         const width = this.getAttributeForCurrentSize(this.props.width)
         const unit = width.indexOf('px') === -1 ? '%' : 'px'
         this.state.width = parseFloat(width) + unit
      }

      const gridStyle = {
         width: this.state.width
      }

      const gridInnerStyle = {
         width: this.state.innerWidth,
         marginLeft: `-${gutter}px`
      }

      return (
         <div ref={node => (this.node = node)} className={classes} style={gridStyle}>
            <div className={style.gridInnerContainer} style={gridInnerStyle}>
               {this.props.children}
            </div>
         </div>
      )
   }
}
