import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'

// TODO: This needs to be smarter
// will probably have state to determine active state?

const Nav = ({ children, className, type }) => {
   const navClass = [styles[type], className]

   return (
      <div className={classNames(navClass)}>{children}</div>
   )
}

Nav.propTypes = {
   children: PropTypes.node,
   className: PropTypes.string,
   type: PropTypes.string.isRequired
}

export default Nav
