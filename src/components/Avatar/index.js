import PropTypes from 'prop-types'
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
   className: PropTypes.string,
   src: PropTypes.string,
   style: PropTypes.objectOf(PropTypes.string)
}

export default Avatar
