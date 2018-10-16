import React, { Component } from 'react'
import { css, cx } from 'emotion'
import PropTypes from 'prop-types'
import { breakpoints, getAttributeForCurrentSize } from '../../utils/size'

export default class SmartText extends Component {
   /* eslint-disable */
   static propTypes = {
      baseFontUnit: PropTypes.string.isRequired,
      children: PropTypes.node,
      className: PropTypes.string,
      color: PropTypes.string,
      fontFamily: PropTypes.string,
      scaleRatio: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      style: PropTypes.object,
      uppercase: PropTypes.bool,
      weight: PropTypes.string.isRequired
   }
   /* eslint-enable */

   static defaultProps = {
      baseFontUnit: '2.7[a] 1.1[b] 0.75[c] 0.625[d] 0.6[e]',
      scaleRatio: '1.08[a] 1.08[b] 1.125[c-e]',
      size: '3',
      weight: 'normal'
   }

   static contextTypes = {
      OIOStyles: PropTypes.object
   }

   setFontSize = (styleObj, props) => {
      breakpoints.forEach((breakpoint, index) => {
         const baseFontUnit = parseFloat(getAttributeForCurrentSize(
            breakpoint.name, props.baseFontUnit
         ))

         const size = parseFloat(getAttributeForCurrentSize(breakpoint.name, props.size))
         const scaleRatioStr = getAttributeForCurrentSize(breakpoint.name, props.scaleRatio)
         const scaleRatioFloat = parseFloat(scaleRatioStr)

         let adjustedSize = scaleRatioFloat ** size
         let lineHeight = '140%'

         if (size < 1) {
            adjustedSize = scaleRatioFloat * size
         }

         if (size > 5) {
            lineHeight = '130%'
         }

         if (props.uppercase) {
            adjustedSize *= 0.9
         }

         styleObj[breakpoint.key].fontSize = `${baseFontUnit * adjustedSize}vw`
         styleObj[breakpoint.key].lineHeight = lineHeight
      })
   }

   render() {
      const { baseFontUnit, color, fontFamily,
         scaleRatio, size, style, uppercase, weight } = this.props

      const styleObj = {
         fontWeight: this.context.OIOStyles.fontWeights[weight],
         [breakpoints[0].key]: {},
         [breakpoints[1].key]: {},
         [breakpoints[2].key]: {},
         [breakpoints[3].key]: {},
         [breakpoints[4].key]: {},
         ...style
      }

      if (color) {
         styleObj.color = color
      }

      if (fontFamily) {
         styleObj.fontFamily = fontFamily
      }

      if (uppercase) {
         styleObj.textTransform = 'uppercase'
      }

      this.setFontSize(styleObj, { baseFontUnit, scaleRatio, size, uppercase })

      return (
         <div className={cx(css(styleObj), this.props.className)}>
            {this.props.children}
         </div>
      )
   }
}
