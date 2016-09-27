import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'

const Textarea = ({ className, input, placeholder, rows, value }) => {
   const classes = [styles.textarea, className]

   return (
      <textarea
         placeholder={placeholder}
         value={value}
         rows={rows}
         className={classNames(classes)}
         {...input}
      />
   )
}

Textarea.propTypes = {
   className: React.PropTypes.string,
   input: React.PropTypes.object,
   placeholder: React.PropTypes.string,
   rows: React.PropTypes.string,
   value: React.PropTypes.string
}

Textarea.defaultProps = {
   rows: '5'
}

export default Textarea
