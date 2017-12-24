import PropTypes from 'prop-types'
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
   children: PropTypes.node,
   flush: PropTypes.bool
}

export default ActionBar
