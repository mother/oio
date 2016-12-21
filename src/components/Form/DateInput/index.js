import React, { Component } from 'react'

import classNames from 'classnames'

import styles from '../Input/styles.less'
import formStyles from '../styles.less'

export default class DateInput extends Component {
   static propTypes = {
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

   static defaultProps = {
      value: ''
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
   }

   constructor(props, context) {
      super(props, context)
   }

   componentWillReceiveProps(props) {
   }

   render() {
      return (
         <div className={formStyles.container}>
            {label && <label htmlFor={id}>{label}</label>}
            <Flatpickr
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
}
