import React from 'react'
import { getAttributeForCurrentSize } from '../../utils/size'

const Spacer = ({ size }, context) => {
   const spacerSize = parseFloat(getAttributeForCurrentSize(context.windowSize, size))

   const style = {
      float: 'left',
      width: '100%',
      height: `${spacerSize * 6}px`
   }

   return (
      <div style={style} />
   )
}

Spacer.propTypes = {
   size: React.PropTypes.string.isRequired
}

Spacer.contextTypes = {
   OIOStyles: React.PropTypes.object
}

export default Spacer
