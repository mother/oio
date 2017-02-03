import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'

const ActionBar = ({ children, flush }) => {
   const actionBarStyles = [styles.actionBar]

   if (flush) {
      actionBarStyles.push(styles.flush)
   }

   return (
      <div className={classNames(actionBarStyles)}>{children}</div>
   )
}

ActionBar.propTypes = {
   children: React.PropTypes.node,
   flush: React.PropTypes.bool
}

export default ActionBar
