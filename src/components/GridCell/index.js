import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { css, cx } from 'emotion'
import { breakpoints, setAttributeForBreakpoints, getAttributeForCurrentSize } from '../../utils/size'

export default class GridCell extends Component {
   /* eslint-disable */
   static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      colspan: PropTypes.string,
      float: PropTypes.string,
      height: PropTypes.string,
      minHeight: PropTypes.string,
      offset: PropTypes.string,
      style: PropTypes.object,
      index: PropTypes.number,
      totalGridCells: PropTypes.number
   }

   static defaultProps = {
      colspan: '1',
      float: 'left',
      style: {},
      index: 0, // this is passed from the Grid Component
      totalGridCells: 1 // this is passed from the Grid Component
   }
   /* eslint-enable */

   static contextTypes = {
      GridCellStyle: PropTypes.object
   }

   setGridCellWidth = (styleObj, props) => {
      breakpoints.forEach((breakpoint, index) => {
         const columns = getAttributeForCurrentSize(breakpoint.name, props.columns)
         const colspan = getAttributeForCurrentSize(breakpoint.name, props.colspan)

         styleObj[breakpoint.key].width = `${parseInt(colspan, 10) * parseFloat(100 / columns)}%`
      })
   }

   setGridCellOffset = (styleObj, props) => {
      if (props.offset) {
         breakpoints.forEach((breakpoint, index) => {
            const columns = getAttributeForCurrentSize(breakpoint.name, props.columns)
            const offset = getAttributeForCurrentSize(breakpoint.name, props.offset)
            styleObj[breakpoint.key].marginLeft = `${offset * parseFloat(100 / columns)}%`
         })
      }
   }

   setGridCellGutter = (styleObj, breakpoint, attributeValue) => {
      const gutter = parseFloat(attributeValue)
      styleObj[breakpoint.key].paddingRight = `${gutter}px`
      styleObj[breakpoint.key].marginBottom = `${gutter}px`
   }

   hideGutterOnLastRowCells = (styleObj, props) => {
      const totalGridCells = props.totalGridCells
      const gridCellIndex = props.index

      breakpoints.forEach((breakpoint) => {
         const columns = getAttributeForCurrentSize(breakpoint.name, props.columns)
         const remainder = totalGridCells % columns

         if (remainder === 0 && (totalGridCells <= columns)) {
            styleObj[breakpoint.key].marginBottom = '0px'
         } else if (remainder === 0 && (gridCellIndex === (totalGridCells - 1))) {
            styleObj[breakpoint.key].marginBottom = '0px'
         } else if (gridCellIndex > (totalGridCells - remainder - 1)) {
            styleObj[breakpoint.key].marginBottom = '0px'
         }
      })
   }

   render() {
      const { className, colspan, float, index, minHeight,
         height, totalGridCells, offset } = this.props
      const gridContext = this.context.GridCellStyle

      const gridCellStyleObj = {
         float: 'left',
         position: 'relative',
         [breakpoints[0].key]: {},
         [breakpoints[1].key]: {},
         [breakpoints[2].key]: {},
         [breakpoints[3].key]: {},
         [breakpoints[4].key]: {},
         ...this.props.style
         // , backgroundColor: 'rgba(255,0,0,0.1)', // XRAY
      }

      this.setGridCellWidth(gridCellStyleObj, { ...gridContext, colspan })
      this.setGridCellOffset(gridCellStyleObj, { ...gridContext, offset })

      setAttributeForBreakpoints(gridCellStyleObj, null, gridContext.gutter, this.setGridCellGutter)
      setAttributeForBreakpoints(gridCellStyleObj, 'float', float)
      setAttributeForBreakpoints(gridCellStyleObj, 'minHeight', minHeight)
      setAttributeForBreakpoints(gridCellStyleObj, 'height', height)

      // Removes bottom gutter margin on GridCells that are on the last row of the
      // parent Grid component
      if (gridContext.hideBottomGutter) {
         this.hideGutterOnLastRowCells(gridCellStyleObj, {
            ...gridContext, colspan, index, totalGridCells, offset
         })
      }

      const gridCellInnerStyleObj = {
         width: '100%',
         [breakpoints[0].key]: {},
         [breakpoints[1].key]: {},
         [breakpoints[2].key]: {},
         [breakpoints[3].key]: {},
         [breakpoints[4].key]: {}
      }

      setAttributeForBreakpoints(gridCellInnerStyleObj, 'minHeight', minHeight)
      setAttributeForBreakpoints(gridCellInnerStyleObj, 'height', height)

      return (
         <div className={cx(css(gridCellStyleObj), className)}>
            <div className={css(gridCellInnerStyleObj)}>
               {this.props.children}
            </div>
         </div>
      )
   }
}
