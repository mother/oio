import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'

const Avatar = ({ className, src, style }) => {
   const classes = [styles.avatar, className]

   if (!src) {
      classes.push(styles.defaultAvatar)
   } else {
      style.backgroundImage = `url(${src})`
   }

   return (
      <div className={classNames(classes)} style={style} />
   )
}

Avatar.propTypes = {
   className: React.PropTypes.string,
   src: React.PropTypes.string,
   style: React.PropTypes.objectOf(React.PropTypes.string)
}

export default Avatar
