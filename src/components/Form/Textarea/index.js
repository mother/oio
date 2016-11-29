import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

const Textarea = ({
   className, id, label, meta, name, onBlur, onChange, placeholder, rows, value
}) => {
   const classes = [styles.textarea, className]

   return (
      <div className={formStyles.container}>
         {label && <label htmlFor={id}>{label}</label>}
         <textarea
            className={classNames(classes)}
            id={id}
            onBlur={onBlur}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
            value={value}
            rows={rows}
         />
         {meta && meta.touched && meta.error &&
            <div className={formStyles.error}>
               {meta.error}
            </div>
         }
      </div>
   )
}

Textarea.propTypes = {
   className: React.PropTypes.string,
   id: React.PropTypes.string,
   label: React.PropTypes.string,
   meta: React.PropTypes.object,
   name: React.PropTypes.string,
   onBlur: React.PropTypes.func,
   onChange: React.PropTypes.func,
   placeholder: React.PropTypes.string,
   rows: React.PropTypes.string,
   value: React.PropTypes.string
}

Textarea.defaultProps = {
   rows: '5'
}

Textarea.type = 'Textarea'

export default Textarea
