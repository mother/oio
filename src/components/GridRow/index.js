import React from 'react'
import style from './style.less'

const GridRow = ({ children }) => (
   <div className={style.gridRow}>
      {children}
   </div>
)

GridRow.propTypes = {
   children: React.PropTypes.node
}

export default GridRow
