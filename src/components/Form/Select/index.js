import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

const Select = ({ children, className, id, input, label, meta, onChangeAction }) => {
   const classes = [styles.select, className]

   return (
      <div className={formStyles.container}>
         {label && <label htmlFor={id}>{label}</label>}
         <select
            className={classNames(classes)}
            id={id}
            {...input}
            onChange={(event) => {
               input.onChange(event)
               if (onChangeAction) onChangeAction(event)
            }}>{children}</select>
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
   input: React.PropTypes.object,
   label: React.PropTypes.string,
   meta: React.PropTypes.object,
   onChangeAction: React.PropTypes.func
}

Select.defaultProps = {
   type: 'text'
}

export default Select
