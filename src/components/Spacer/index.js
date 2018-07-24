import PropTypes from 'prop-types'
import React from 'react'
import { breakpoints, setAttributeForBreakpoints } from '../../utils/size'

const setSpacerHeight = (styleObj, breakpoint, attributeValue) => {
   styleObj[breakpoint.key].height = `${attributeValue * 6}px`
}

const Spacer = ({ size }) => {
   const styleObj = {
      float: 'left',
      width: '100%',
      [breakpoints[0].key]: {},
      [breakpoints[1].key]: {},
      [breakpoints[2].key]: {},
      [breakpoints[3].key]: {},
      [breakpoints[4].key]: {}
   }

   setAttributeForBreakpoints(styleObj, 'height', size, setSpacerHeight)

   return (
      <div style={styleObj} />
   )
}

Spacer.propTypes = {
   size: PropTypes.string.isRequired
}

export default Spacer
