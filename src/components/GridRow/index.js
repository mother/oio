import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import style from './style.less'

const GridRow = ({ children, className }) => (
   <div className={classNames(style.gridRow, className)}>
      {children}
   </div>
)

GridRow.propTypes = {
   children: PropTypes.node,
   className: PropTypes.string
}

export default GridRow
