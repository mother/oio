import PropTypes from 'prop-types'
import React from 'react'
import style from './style.less'

const Table = ({ children }) => (
   <table className={style.table}>{children}</table>
)

Table.propTypes = {
   children: PropTypes.node
}

export default Table
