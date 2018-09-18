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
      height: PropTypes.string,
      style: PropTypes.object,
      width: PropTypes.string,
      hideBottomGutter: PropTypes.bool
   }

   static defaultProps = {
      columns: '12',
      gutter: '6px',
      style: {},
      width: '100%',
      hideBottomGutter: false
   }
   /* eslint-enable */

   static childContextTypes = {
      GridCellStyle: PropTypes.object
   }

   getChildContext() {
      const GridCellStyle = {
         columns: this.props.columns,
         gutter: this.props.gutter,
         hideBottomGutter: this.props.hideBottomGutter
      }

      return { GridCellStyle }
   }

   setGridInnerGutter = (styleObj, breakpoint, attributeValue) => {
      styleObj[breakpoint.key].width = `calc(100% + ${attributeValue})`
   }

   render() {
      const { children, hideBottomGutter } = this.props
      const styleProps = ['gutter', 'width', 'height']

      const gridStyleObj = {
         display: 'block',
         overflow: 'hidden',
         margin: 'auto',
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

      setAttributeForBreakpoints(gridInnerStyleObj, 'height', this.props.height)
      setAttributeForBreakpoints(
         gridInnerStyleObj, null, this.props.gutter, this.setGridInnerGutter
      )

      let gridContent = children

      if (hideBottomGutter) {
         gridContent = (
            React.Children.map(children, (child, index) => (
               React.cloneElement(child, { totalGridCells: children.length, index })
            ))
         )
      }

      return (
         <div className={cx(css(gridStyleObj), this.props.className)}>
            <div className={css(gridInnerStyleObj)}>
               {gridContent}
            </div>
         </div>
      )
   }
}
