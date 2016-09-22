import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'

const Textarea = ({ className, rows, value }) => {
   const classes = [styles.textarea, className]

   return (
      <textarea value={value} rows={rows} className={classNames(classes)} />
   )
}

Textarea.propTypes = {
   className: React.PropTypes.string,
   rows: React.PropTypes.string,
   value: React.PropTypes.string
}

Textarea.defaultProps = {
   rows: '5'
}

export default Textarea
