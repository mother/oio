import React, { Component } from 'react'
import classNames from 'classnames'
import { getWindowSize, getAttributeForCurrentSize } from '../../utils/size'
import style from './style.less'

export default class Grid extends Component {
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

   constructor(props) {
      super(props)

      this.state = {
         size: getWindowSize(),
         width: 'auto',
         innerWidth: '100%',
         cellWidth: 'auto',
         cellGutter: 'auto'
      }
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

   windowSizeUpdated = () => {
      const windowSize = getWindowSize()
      this.setState({ size: windowSize })
   }

   updateGrid() {
      const columns = getAttributeForCurrentSize(this.state.size, this.props.columns)
      const gutter = getAttributeForCurrentSize(this.state.size, this.props.gutter)

      const calculatedGridWidth = this.node.clientWidth
      const adjustedGridWidth = parseFloat(calculatedGridWidth) + parseFloat(gutter)
      const cellWidth = (adjustedGridWidth) / columns

      if (this.state.innerWidth !== adjustedGridWidth) {
         this.setState({
            innerWidth: adjustedGridWidth
         })
      }

      if (this.state.cellWidth !== cellWidth) {
         this.setState({
            cellWidth,
            cellGutter: gutter
         })
      }
   }

   render() {
      const classes = classNames(style.gridContainer, this.props.className)
      const gutter = parseFloat(getAttributeForCurrentSize(this.state.size, this.props.gutter))

      // TODO: Should use setState
      if (this.props.width) {
         const width = getAttributeForCurrentSize(this.state.size, this.props.width)
         const unit = width.endsWith('px') ? 'px' : '%'
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
