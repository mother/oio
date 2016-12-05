import React from 'react'
import formStyles from '../styles.less'

const Checkbox = ({
   checked, children, id, label, name, onBlur, onChange, value
}) => (
   <span className={formStyles.container}>
      <input
         id={id}
         className={formStyles.inputCheckbox}
         checked={checked}
         type="checkbox"
         name={name}
         value={value}
         onChange={onChange}
         onBlur={onBlur}
      />
      <label className={formStyles.labelCheckbox} htmlFor={id}>{label}</label>
      {children}
   </span>
)

Checkbox.propTypes = {
   checked: React.PropTypes.bool,
   children: React.PropTypes.node,
   id: React.PropTypes.string,
   label: React.PropTypes.string,
   name: React.PropTypes.string,
   onBlur: React.PropTypes.func,
   onChange: React.PropTypes.func,
   value: React.PropTypes.string
}

export default Checkbox
