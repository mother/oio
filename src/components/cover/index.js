import React from 'react'

const UICover = ({
   src,
   size = 'cover',
   position = 'center center',
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

UICover.propTypes = {
   children: React.PropTypes.node,
   className: React.PropTypes.string,
   position: React.PropTypes.string,
   size: React.PropTypes.string,
   src: React.PropTypes.string.isRequired
}

export default UICover
