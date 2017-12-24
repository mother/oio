import PropTypes from 'prop-types'
import React from 'react'

const Cover = ({
   src,
   size = 'cover',
   position,
   children,
   className }) => {
   const style = {
      float: 'left',
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${src})`,
      backgroundSize: size,
      backgroundPosition: position,
      backgroundRepeat: 'no-repeat'
   }

   return (
      <div className={className} style={style}>{children}</div>
   )
}

Cover.propTypes = {
   children: PropTypes.node,
   className: PropTypes.string,
   position: PropTypes.string,
   size: PropTypes.string,
   src: PropTypes.string
}

Cover.defaultProps = {
   position: 'center center'
}

export default Cover
