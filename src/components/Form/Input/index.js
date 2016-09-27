import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'

const Input = ({ className, input, placeholder, type, value }) => {
   const classes = [styles.input, className]

   return (
      <input
         type={type}
         placeholder={placeholder}
         value={value}
         className={classNames(classes)}
         {...input}
      />
   )
}

Input.propTypes = {
   className: React.PropTypes.string,
   input: React.PropTypes.object,
   placeholder: React.PropTypes.string,
   type: React.PropTypes.string,
   value: React.PropTypes.string
}

Input.defaultProps = {
   type: 'text'
}

export default Input
