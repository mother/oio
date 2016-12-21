import React from 'react'
import classNames from 'classnames'
import ReactFlatpickr from 'react-flatpickr'

import styles from '../Input/styles.less'
import formStyles from '../styles.less'
// import pickerStyles from './flatpickr.less'

const DateInput = ({
   className, enableTime, error, id, label, name, onBlur, onChange, placeholder, touched, value
}, context) => {
   const classes = [styles.input, styles.pointer, className]

   return (
      <div className={formStyles.container}>
         {label && <label htmlFor={id}>{label}</label>}
         <ReactFlatpickr
            options={{
               altInput: true,
               altInputClass: classNames(classes),
               altFormat: enableTime ? 'F j, Y, h:i K' : 'F j, Y',
               enableTime
            }}
            id={id}
            onBlur={onBlur}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
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

DateInput.propTypes = {
   className: React.PropTypes.string,
   enableTime: React.PropTypes.bool,
   error: React.PropTypes.string,
   id: React.PropTypes.string,
   label: React.PropTypes.string,
   name: React.PropTypes.string,
   onBlur: React.PropTypes.func,
   onChange: React.PropTypes.func,
   placeholder: React.PropTypes.string,
   touched: React.PropTypes.bool,
   value: React.PropTypes.string
}

DateInput.defaultProps = {
   value: ''
}

DateInput.contextTypes = {
   OIOStyles: React.PropTypes.object
}

export default DateInput
