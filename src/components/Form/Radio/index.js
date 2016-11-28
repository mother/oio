import React from 'react'
import formStyles from '../styles.less'

const Radio = ({
   children, defaultChecked, id, label, name, onBlur, onChange, value
}) => (
   <span className={formStyles.container}>
      <input
         id={id}
         className={formStyles.inputRadio}
         defaultChecked={defaultChecked}
         type="radio"
         name={name}
         value={value}
         onChange={onChange}
         onBlur={onBlur}
      />
      <label className={formStyles.labelRadio} htmlFor={id}>{label}</label>
      {children}
   </span>
)

Radio.propTypes = {
   children: React.PropTypes.node,
   defaultChecked: React.PropTypes.bool,
   id: React.PropTypes.number,
   label: React.PropTypes.string,
   name: React.PropTypes.string,
   onBlur: React.PropTypes.func,
   onChange: React.PropTypes.func,
   value: React.PropTypes.string
}

Radio.type = 'radio'

export default Radio
