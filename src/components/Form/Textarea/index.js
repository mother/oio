import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

const Textarea = ({
   className, id, input, label, meta,
   onChangeAction, placeholder, rows, value }) => {
   const classes = [styles.textarea, className]

   return (
      <div className={formStyles.container}>
         {label && <label htmlFor={id}>{label}</label>}
         <textarea
            className={classNames(classes)}
            id={id}
            placeholder={placeholder}
            rows={rows}
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

Textarea.propTypes = {
   className: React.PropTypes.string,
   id: React.PropTypes.string,
   input: React.PropTypes.object,
   label: React.PropTypes.string,
   meta: React.PropTypes.object,
   onChangeAction: React.PropTypes.func,
   placeholder: React.PropTypes.string,
   rows: React.PropTypes.string,
   value: React.PropTypes.string
}

Textarea.defaultProps = {
   rows: '5'
}

export default Textarea
