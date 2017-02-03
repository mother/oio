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
   children: React.PropTypes.node,
   className: React.PropTypes.string,
   type: React.PropTypes.string.isRequired
}

export default Nav
