import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

const Input = ({ className, id, input, label, meta, onChangeAction, placeholder, type }) => {
   const classes = [styles.input, className]

   return (
      <div className={formStyles.container}>
         {label && <label htmlFor={id}>{label}</label>}
         <input
            className={classNames(classes)}
            id={id}
            placeholder={placeholder}
            type={type}
            {...input}
            onChange={(event) => {
               input.onChange(event)
               if (onChangeAction) onChangeAction(event)
            }}
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
   onChangeAction: React.PropTypes.func,
   placeholder: React.PropTypes.string,
   type: React.PropTypes.string
}

Input.defaultProps = {
   type: 'text'
}

export default Input
