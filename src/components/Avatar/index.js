import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'

const Avatar = ({ className, src, style }) => {
   const classes = [styles.avatar, className]
   const avatarStyle = { ...style }

   if (!src) {
      classes.push(styles.defaultAvatar)
   } else {
      avatarStyle.backgroundImage = `url(${src})`
   }

   return (
      <div className={classNames(classes)} style={avatarStyle} />
   )
}

Avatar.propTypes = {
   className: React.PropTypes.string,
   src: React.PropTypes.string,
   style: React.PropTypes.objectOf(React.PropTypes.string)
}

export default Avatar
