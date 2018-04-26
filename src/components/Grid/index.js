import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { css, cx } from 'emotion'
import { breakpoints, setAttributeForBreakpoints } from '../../utils/size'

export default class Grid extends Component {
   /* eslint-disable */
   static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      columns: PropTypes.string,
      gutter: PropTypes.string,
      style: PropTypes.object,
      width: PropTypes.string
   }

   static defaultProps = {
      columns: '12',
      gutter: '6px',
      style: {},
      width: '100%'
   }
   /* eslint-enable */

   static childContextTypes = {
      GridCellStyle: PropTypes.object
   }

   getChildContext() {
      const GridCellStyle = {
         columns: this.props.columns,
         gutter: this.props.gutter
      }

      return { GridCellStyle }
   }

   setGridInnerGutter = (styleObj, breakpoint, attributeValue) => {
      styleObj[breakpoint.key].width = `calc(100% + ${parseFloat(attributeValue)}px)`
   }

   render() {
      const styleProps = ['gutter', 'width']

      const gridStyleObj = {
         float: 'left',
         display: 'block',
         overflow: 'hidden',
         [breakpoints[0].key]: {},
         [breakpoints[1].key]: {},
         [breakpoints[2].key]: {},
         [breakpoints[3].key]: {},
         [breakpoints[4].key]: {},
         ...this.props.style
         // , backgroundColor: 'rgba(0,255,0, 0.1)', // XRAY
      }

      styleProps.forEach((prop) => {
         setAttributeForBreakpoints(gridStyleObj, prop, this.props[prop])
      })

      const gridInnerStyleObj = {
         position: 'relative',
         top: 0,
         left: 0,
         [breakpoints[0].key]: {},
         [breakpoints[1].key]: {},
         [breakpoints[2].key]: {},
         [breakpoints[3].key]: {},
         [breakpoints[4].key]: {}
      }

      setAttributeForBreakpoints(
         gridInnerStyleObj, null, this.props.gutter, this.setGridInnerGutter
      )

      return (
         <div className={cx(css(gridStyleObj), this.props.className)}>
            <div className={css(gridInnerStyleObj)}>
               {this.props.children}
            </div>
         </div>
      )
   }
}
