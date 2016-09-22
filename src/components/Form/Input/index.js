import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'

const Input = ({ className, type, value }) => {
   const classes = [styles.input, className]

   return (
      <input type={type} value={value} className={classNames(classes)} />
   )
}

Input.propTypes = {
   className: React.PropTypes.string,
   type: React.PropTypes.string,
   value: React.PropTypes.string
}

Input.defaultProps = {
   type: 'text'
}

export default Input
