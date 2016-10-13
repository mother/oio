import React from 'react'
import classNames from 'classnames'

import styles from './styles.less'

export default class Grid extends React.Component {
   static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      columns: React.PropTypes.string,
      gutter: React.PropTypes.string,
      width: React.PropTypes.string
   }

   static childContextTypes = {
      GridCellStyle: React.PropTypes.object
   }

   constructor(props, context) {
      super(props, context)

      this.state = {
         size: this.getWindowSize(),
         width: 'auto',
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
      this.setGridCellWidth()
      window.addEventListener('resize', this.windowSizeUpdated, false)
   }

   componentDidUpdate() {
      console.log('updated')
      this.setGridCellWidth()
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

   setGridCellWidth() {
      let columns = 12
      let gutter = 6

      console.log(typeof this.state.width)

      if (typeof this.state.width !== 'number' && (this.props.width !== this.state.width || typeof this.state.width === 'string')) {
         console.log('set', this.props.width, this.state.width)
         const width = this.getAttributeForCurrentSize(this.props.width)
         const unit = width.indexOf('px') === -1 ? '%' : 'px'
         this.state.width = parseFloat(width) + unit
      }

      if (this.props.columns) {
         columns = this.getAttributeForCurrentSize(this.props.columns)
      }

      if (this.props.gutter) {
         gutter = this.getAttributeForCurrentSize(this.props.gutter)
      }

      const gridWidth = this.node.clientWidth
      const gridWidthAdjusted = parseFloat(gridWidth) + parseFloat(gutter)
      const netWidthRemaining = (columns - 1) * gutter
      console.log(gridWidth, gridWidthAdjusted, this.state.width)
      const cellWidth = (gridWidth - parseFloat(gutter)) / columns

      if(this.state.width !== gridWidth) {
         console.log('ADJUST- I am different', gridWidthAdjusted)
         this.setState({
            width: gridWidthAdjusted
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
      let columns = 12
      let gutter = 6
      const classes = classNames(styles.gridContainer, this.props.className)

      // if (this.props.width) {
      //    const width = this.getAttributeForCurrentSize(this.props.width)
      //    const unit = width.indexOf('px') === -1 ? '%' : 'px'
      //    this.state.width = parseFloat(width) + unit
      // }

      if (this.props.columns) {
         columns = this.getAttributeForCurrentSize(this.props.columns)
      }

      if (this.props.gutter) {
         gutter = this.getAttributeForCurrentSize(this.props.gutter)
      }

      // const cellWidth = 100 / columns
      // const modifyGridCell = function (child) {
      //    return React.cloneElement(child, {
      //       width: `${cellWidth}%`,
      //       gutter: `${gutter}px`
      //    })
      // }
      // const gridCells = React.Children.map(this.props.children, modifyGridCell)
      const gridStyle = {
         width: `${this.state.width}px`,
         marginLeft: `-${gutter}px`
      }

      return (
         <div ref={node => (this.node = node)} className={classes} style={gridStyle}>
            {this.props.children}
         </div>
      )
   }
}
