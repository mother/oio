import React from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
import styles from './styles.less'

const Button = ({
   className, icon, name, onClick, outline, outlineNegative, rounded, size, textClassName, type
}, context) => {
   const buttonClasses = [className]
   const buttonTextClasses = [styles.text]
   const buttonName = name
   const style = {}

   buttonClasses.push(styles[size])

   if (icon && name) {
      buttonClasses.push(styles[`${size}IconAndText`])
   }

   if (icon && !name) {
      buttonClasses.push(styles[`${size}IconOnly`])
   }

   if (rounded) {
      buttonClasses.push(styles[`${size}Rounded`])
   }

   if (outline) {
      buttonClasses.push(styles.outline)
   }

   if (outlineNegative) {
      buttonClasses.push(styles.outlineNegative)
   }

   if (textClassName) {
      buttonTextClasses.push(textClassName)
   }

   // If Buttons are part of a Button Group
   if (context.buttonGroupStyle) {
      const buttonGroup = context.buttonGroupStyle
      style.marginBottom = buttonGroup.spacing
      style.verticalAlign = 'middle'

      if (buttonGroup.align === 'left') {
         style.marginRight = buttonGroup.spacing
      } else if (buttonGroup.align === 'right') {
         style.marginLeft = buttonGroup.spacing
      }
   }

   return (
      <button className={classNames(buttonClasses)} onClick={onClick} style={style} type={type}>
         <Icon className={styles.icon} name={icon} />
         <span className={classNames(styles.text, buttonTextClasses)}>{buttonName}</span>
      </button>
   )
}

Button.propTypes = {
   className: React.PropTypes.string,
   icon: React.PropTypes.string,
   name: React.PropTypes.string,
   onClick: React.PropTypes.func,
   outline: React.PropTypes.bool,
   outlineNegative: React.PropTypes.bool,
   rounded: React.PropTypes.bool,
   size: React.PropTypes.string,
   textClassName: React.PropTypes.string,
   type: React.PropTypes.string
}

Button.defaultProps = {
   size: 'medium',
   type: 'button'
}

Button.contextTypes = {
   buttonGroupStyle: React.PropTypes.object
}

export default Button
