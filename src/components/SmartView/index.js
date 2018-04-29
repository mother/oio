import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'emotion'
import { breakpoints, setAttributeForBreakpoints } from '../../utils/size'

export default class SmartView extends Component {
   /* eslint-disable */
   static propTypes = {
      alignItems: PropTypes.string,
      children: PropTypes.node,
      className: PropTypes.string,
      display: PropTypes.string,
      flex: PropTypes.string,
      flexFlow: PropTypes.string,
      height: PropTypes.string,
      justifyContent: PropTypes.string,
      minHeight: PropTypes.string,
      maxHeight: PropTypes.string,
      minWidth: PropTypes.string,
      maxWidth: PropTypes.string,
      padding: PropTypes.string,
      paddingTop: PropTypes.string,
      paddingLeft: PropTypes.string,
      paddingRight: PropTypes.string,
      paddingBottom: PropTypes.string,
      paddingHorizontal: PropTypes.string,
      paddingVertical: PropTypes.string,
      position: PropTypes.string,
      style: PropTypes.object,
      top: PropTypes.string,
      left: PropTypes.string,
      right: PropTypes.string,
      bottom: PropTypes.string,
      width: PropTypes.string,
      scroll: PropTypes.string,
      onScroll: PropTypes.func
   }

   static defaultProps = {
      display: 'flex',
      position: 'relative',
      flexFlow: 'row',
      top: '0px',
      left: '0px',
      children: null,
      style: {},
      onScroll: () => {}
   }
   /* eslint-enable */

   setScrollAttributes = (styleObj, breakpoint) => {
      styleObj[breakpoint.key].overflow = 'auto'
      styleObj[breakpoint.key]['-webkit-overflow-scrolling'] = 'touch'
   }

   setPaddingHorizontal = (styleObj, breakpoint, attributeValue) => {
      styleObj[breakpoint.key].paddingLeft = attributeValue
      styleObj[breakpoint.key].paddingRight = attributeValue
   }

   setPaddingVertical = (styleObj, breakpoint, attributeValue) => {
      styleObj[breakpoint.key].paddingTop = attributeValue
      styleObj[breakpoint.key].paddingBottom = attributeValue
   }

   render() {
      const styleProps = [
         'position', 'display',
         'flex', 'flexFlow', 'alignItems', 'justifyContent',
         'top', 'bottom', 'right', 'left',
         'height', 'minHeight', 'maxHeight', 'width', 'minWidth', 'maxWidth',
         'padding', 'paddingBottom', 'paddingTop', 'paddingRight', 'paddingLeft'
      ]

      const styleObj = {
         [breakpoints[0].key]: {},
         [breakpoints[1].key]: {},
         [breakpoints[2].key]: {},
         [breakpoints[3].key]: {},
         [breakpoints[4].key]: {},
         ...this.props.style
      }

      styleProps.forEach((prop) => {
         setAttributeForBreakpoints(styleObj, prop, this.props[prop])
      })

      setAttributeForBreakpoints(styleObj, null, this.props.scroll, this.setScrollAttributes)
      setAttributeForBreakpoints(
         styleObj, null, this.props.paddingHorizontal, this.setPaddingHorizontal
      )
      setAttributeForBreakpoints(
         styleObj, null, this.props.paddingVertical, this.setPaddingVertical
      )

      if (styleObj.width === 'auto') {
         delete styleObj.width
      }

      return (
         <div onScroll={this.props.onScroll} className={cx(css(styleObj), this.props.className)}>
            {this.props.children}
         </div>
      )
   }
}
