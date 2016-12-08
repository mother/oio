import React from 'react'
import classNames from 'classnames'
import converColor from '../../utils/convertColor'
import Icon from '../Icon'
import styles from './styles.less'

const Button = ({
   className,
   icon,
   mode,
   name,
   onClick,
   outline,
   outlineNegative,
   plain,
   rounded,
   size,
   textClassName,
   type
}, context) => {
   const buttonClasses = [className]
   const buttonTextClasses = [styles.text]
   const buttonName = name
   const style = {
      backgroundColor: context.OIOStyles.primaryColor
   }
   let modeIcon

   buttonClasses.push(styles[size])

   const color = converColor('#ff0000')
   console.log(color)

   if (icon && name) {
      buttonClasses.push(styles[`${size}IconAndText`])
   }

   if (icon && !name) {
      buttonClasses.push(styles[`${size}IconOnly`])
   }

   if (mode) {
      buttonClasses.push(styles[`${mode}Mode`])
      modeIcon = <span className={styles.loader} />
   }

   if (rounded) {
      buttonClasses.push(styles[`${size}Rounded`])
   }

   if (outline) {
      buttonClasses.push(styles.outline)
      delete style.backgroundColor
   }

   if (outlineNegative) {
      buttonClasses.push(styles.outlineNegative)
      delete style.backgroundColor
   }

   if (plain) {
      buttonClasses.push(styles.plain)
      style.color = context.OIOStyles.primaryColor
      delete style.backgroundColor
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
         {modeIcon}
      </button>
   )
}

Button.propTypes = {
   className: React.PropTypes.string,
   icon: React.PropTypes.string,
   mode: React.PropTypes.string,
   name: React.PropTypes.string,
   onClick: React.PropTypes.func,
   outline: React.PropTypes.bool,
   outlineNegative: React.PropTypes.bool,
   plain: React.PropTypes.bool,
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
   buttonGroupStyle: React.PropTypes.object,
   OIOStyles: React.PropTypes.object
}

export default Button
