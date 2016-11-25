import React from 'react'
import formStyles from '../styles.less'

const Checkboxes = ({
   className, id, label, meta, name, onBlur, onChange, options
}) => {
   const children = []
   let counter = 1
   options.forEach((option) => {
      children.push(
         <span key={counter += 1}>
            <input
               id={option.value}
               className={formStyles.inputCheckbox}
               type="checkbox"
               name={name}
               value={option.value}
               onChange={onChange}
               onBlur={onBlur}
            />
            <label className={formStyles.labelCheckbox} htmlFor={option.value}>
               {option.text}
            </label>
         </span>
      )
   })

   return (
      <div className={formStyles.container}>
         {label && <label htmlFor={id}>{label}</label>}
         {children}
         {meta && meta.touched && meta.error &&
            <div className={formStyles.error}>
               {meta.error}
            </div>
         }
      </div>
   )
}

Checkboxes.propTypes = {
   className: React.PropTypes.string,
   id: React.PropTypes.string,
   label: React.PropTypes.string,
   meta: React.PropTypes.object,
   name: React.PropTypes.string,
   onBlur: React.PropTypes.func,
   onChange: React.PropTypes.func,
   options: React.PropTypes.array
}

Checkboxes.type = 'checkbox'

export default Checkboxes
