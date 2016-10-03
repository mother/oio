import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

const Input = ({ children, className, id, input, label, meta, value }) => {
   const classes = [styles.select, className]

   return (
      <div className={formStyles.container}>
         {label && <label htmlFor={id}>{label}</label>}
         <select
            className={classNames(classes)}
            id={id}
            value={value}
            {...input}>{children}</select>
         {meta && meta.touched && meta.error &&
            <div className={formStyles.error}>
               {meta.error}
            </div>
         }
      </div>
   )
}

Input.propTypes = {
   children: React.PropTypes.node,
   className: React.PropTypes.string,
   id: React.PropTypes.string,
   input: React.PropTypes.object,
   label: React.PropTypes.string,
   meta: React.PropTypes.object,
   value: React.PropTypes.string
}

Input.defaultProps = {
   type: 'text'
}

export default Input
