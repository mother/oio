import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

const Input = ({ className, id, input, label, meta, placeholder, type, value }) => {
   const classes = [styles.input, className]

   return (
      <div className={formStyles.container}>
         {label && <label htmlFor={id}>{label}</label>}
         <input
            className={classNames(classes)}
            id={id}
            placeholder={placeholder}
            type={type}
            value={value}
            {...input}
         />
         {meta && meta.touched && meta.error &&
            <div className={formStyles.error}>
               {meta.error}
            </div>
         }
      </div>
   )
}

Input.propTypes = {
   className: React.PropTypes.string,
   id: React.PropTypes.string,
   input: React.PropTypes.object,
   label: React.PropTypes.string,
   meta: React.PropTypes.object,
   placeholder: React.PropTypes.string,
   type: React.PropTypes.string,
   value: React.PropTypes.string
}

Input.defaultProps = {
   type: 'text'
}

export default Input
