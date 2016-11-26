import React from 'react'
import formStyles from '../styles.less'

const Radio = ({
   children, id, label, name, onBlur, onChange, selected, value
}) => {
   return (
      <span className={formStyles.container}>
         <input
            id={id}
            className={formStyles.inputRadio}
            type="radio"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            defaultChecked={selected}
         />
         <label className={formStyles.labelRadio} htmlFor={id}>{label}</label>
         {children}
      </span>
   )
}

Radio.propTypes = {
   children: React.PropTypes.node,
   id: React.PropTypes.number,
   label: React.PropTypes.string,
   name: React.PropTypes.string,
   onBlur: React.PropTypes.func,
   onChange: React.PropTypes.func,
   selected: React.PropTypes.bool,
   value: React.PropTypes.string
}

Radio.type = 'radio'

export default Radio
