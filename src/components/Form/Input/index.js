import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

const Input = ({
   className, error, id, label, name, onBlur, onChange, placeholder, touched, type, value
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
            value={value || ''}
         />
         {touched && error &&
            <div className={formStyles.error}>
               {error}
            </div>
         }
      </div>
   )
}

Input.propTypes = {
   className: React.PropTypes.string,
   error: React.PropTypes.string,
   id: React.PropTypes.string,
   label: React.PropTypes.string,
   name: React.PropTypes.string,
   onBlur: React.PropTypes.func,
   onChange: React.PropTypes.func,
   placeholder: React.PropTypes.string,
   touched: React.PropTypes.bool,
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
