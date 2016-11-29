import React from 'react'
import formStyles from '../styles.less'

const Switch = ({
   checked, children, id, label, name, onBlur, onChange, value
}) => (
   <div className={formStyles.switch}>
      <input
         id={id}
         checked={checked}
         type="checkbox"
         name={name}
         value={value}
         onChange={onChange}
         onBlur={onBlur}
      />
      <label className={formStyles.switchStatus} htmlFor={id}>{label}</label>
      {children}
   </div>
)

Switch.propTypes = {
   checked: React.PropTypes.bool,
   children: React.PropTypes.node,
   id: React.PropTypes.string,
   label: React.PropTypes.string,
   name: React.PropTypes.string,
   onBlur: React.PropTypes.func,
   onChange: React.PropTypes.func,
   value: React.PropTypes.string
}

Switch.type = 'Switch'

export default Switch
