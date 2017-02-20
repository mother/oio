import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

const Textarea = ({
   className, disabled, error, id, label, name, onBlur, onChange, placeholder, rows, touched, value
}) => {
   const classes = [styles.textarea, className]

   return (
      <div className={formStyles.container}>
         {label && <label htmlFor={id}>{label}</label>}
         <textarea
            className={classNames(classes)}
            disabled={disabled}
            id={id}
            onBlur={onBlur}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
            value={value || ''}
            rows={rows}
         />
         {touched && error &&
            <div className={formStyles.error}>
               {error}
            </div>
         }
      </div>
   )
}

Textarea.propTypes = {
   className: React.PropTypes.string,
   error: React.PropTypes.string,
   id: React.PropTypes.string,
   label: React.PropTypes.string,
   name: React.PropTypes.string,
   onBlur: React.PropTypes.func,
   onChange: React.PropTypes.func,
   placeholder: React.PropTypes.string,
   rows: React.PropTypes.string,
   touched: React.PropTypes.bool,
   value: React.PropTypes.string
}

Textarea.defaultProps = {
   rows: '5',
   value: ''
}

export default Textarea
