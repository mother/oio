import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

const Input = ({
   className, id, label, meta, name, onBlur, onChange, placeholder, type, value
}, context) => {
   const classes = [styles.input, className]
   const inputStyles = {}

   if (context.OIOStyles && context.OIOStyles.fontFamily) {
      inputStyles.fontFamily = context.OIOStyles.fontFamily
   }

   return (
      <div className={formStyles.container}>
         {label && <label htmlFor={id}>{label}</label>}
         <input
            style={inputStyles}
            className={classNames(classes)}
            id={id}
            onBlur={onBlur}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
            type={type}
            value={value}
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
   label: React.PropTypes.string,
   meta: React.PropTypes.object,
   name: React.PropTypes.string,
   onBlur: React.PropTypes.func,
   onChange: React.PropTypes.func,
   placeholder: React.PropTypes.string,
   type: React.PropTypes.string,
   value: React.PropTypes.string
}

Input.defaultProps = {
   type: 'text',
   value: ''
}

Input.contextTypes = {
   OIOStyles: React.PropTypes.object
}

export default Input
