import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

const Select = ({ children, className, id, label, meta, onBlur, onChange, value }) => {
   const classes = [styles.select, className]

   return (
      <div className={formStyles.container}>
         {label && <label htmlFor={id}>{label}</label>}
         <select
            className={classNames(classes)}
            id={id}
            onBlur={onBlur}
            onChange={onChange}
            value={value}>
            {children}
         </select>
         {meta && meta.touched && meta.error &&
            <div className={formStyles.error}>
               {meta.error}
            </div>
         }
      </div>
   )
}

Select.propTypes = {
   children: React.PropTypes.node,
   className: React.PropTypes.string,
   id: React.PropTypes.string,
   label: React.PropTypes.string,
   meta: React.PropTypes.object,
   onBlur: React.PropTypes.func,
   onChange: React.PropTypes.func,
   value: React.PropTypes.string
}

Select.defaultProps = {
   type: 'text'
}

Select.type = 'select'

export default Select
