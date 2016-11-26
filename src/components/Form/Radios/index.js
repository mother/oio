import React from 'react'
import formStyles from '../styles.less'

const Radios = ({
   className, id, label, meta, name, onBlur, onChange, options, value
}) => {
   const children = []
   let counter = 1
   options.forEach((option) => {
      children.push(
         <span key={counter += 1}>
            <input
               id={option.value}
               className={formStyles.inputRadio}
               type="radio"
               name={name}
               value={option.value}
               onChange={onChange}
               onBlur={onBlur}
               defaultChecked={option.selected}
               checked={value === option.value}
            />
            <label className={formStyles.labelRadio} htmlFor={option.value}>
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

Radios.propTypes = {
   className: React.PropTypes.string,
   id: React.PropTypes.string,
   label: React.PropTypes.string,
   meta: React.PropTypes.object,
   name: React.PropTypes.string,
   onBlur: React.PropTypes.func,
   onChange: React.PropTypes.func,
   options: React.PropTypes.array,
   value: React.PropTypes.string
}

export default Radios
