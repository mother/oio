import React from 'react'
import classNames from 'classnames'
import styles from './index.less'

const UIAvatar = ({ src, className }) => {
   const classes = ['uiAvatar', this.props.className]
   const style = {}

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
   src: React.PropTypes.string.isRequired,
   className: React.PropTypes.string
}

export default UIAvatar
