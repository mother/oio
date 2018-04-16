import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'emotion'
import { breakpoints, getAttributeForCurrentSize } from '../../utils/size'

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
      maxWidth: PropTypes.string,
      padding: PropTypes.string,
      paddingTop: PropTypes.string,
      paddingLeft: PropTypes.string,
      paddingRight: PropTypes.string,
      paddingBottom: PropTypes.string,
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

   setAttributeForBreakpoints = (styleObj, attributeName, attributeProp, attributeFunction) => {
      if (!attributeProp) {
         return null
      }

      breakpoints.forEach((breakpoint, index) => {
         const attributeValue = getAttributeForCurrentSize(breakpoint.name, attributeProp)

         if (attributeValue) {
            if (attributeFunction) {
               attributeFunction(styleObj, breakpoint, attributeValue)
            } else {
               styleObj[breakpoint.key][attributeName] = attributeValue
            }
         }
      })
   }

   render() {
      const styleProps = [
         'position', 'display',
         'flex', 'flexFlow', 'alignItems', 'justifyContent',
         'top', 'bottom', 'right', 'left',
         'height', 'width', 'maxWidth',
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
         this.setAttributeForBreakpoints(styleObj, prop, this.props[prop])
      })

      this.setAttributeForBreakpoints(styleObj, 'overflow', this.props.scroll, this.setScrollAttributes)

      return (
         <div onScroll={this.props.onScroll} className={cx(css(styleObj), this.props.className)}>
            {this.props.children}
         </div>
      )
   }
}
