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
      height: PropTypes.string,
      offset: PropTypes.string,
      style: PropTypes.object,
   }

   static defaultProps = {
      colspan: '1',
      style: {}
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

   render() {
      const { className, colspan, height, offset } = this.props
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
      setAttributeForBreakpoints(gridCellStyleObj, 'height', height)

      const gridCellInnerStyleObj = {
         float: 'left',
         width: '100%'
      }

      return (
         <div
            className={cx(css(gridCellStyleObj), className)}>
            <div className={css(gridCellInnerStyleObj)}>
               {this.props.children}
            </div>
         </div>
      )
   }
}
