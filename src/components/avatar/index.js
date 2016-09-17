import React from 'react'
import classNames from 'classnames'

import styles from './styles.less'

const UIAvatar = ({ className, src, style }) => {
   const classes = ['uiAvatar', className]

   if (!src) {
      classes.push(styles.defaultAvatar)
   } else {
      style.backgroundImage = `url(${src})`
   }

   return (
      <div className={classNames(styles.uiAvatar)} style={style} />
   )
}

UIAvatar.propTypes = {
   className: React.PropTypes.string,
   src: React.PropTypes.string,
   style: React.PropTypes.objectOf(React.PropTypes.string)
}

export default UIAvatar
