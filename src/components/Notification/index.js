import React from 'react'
import classNames from 'classnames'
import Spacer from '../Spacer'
import Text from '../Text'
import styles from './styles.less'

const Notification = ({
   buttonFull,
   buttonOne,
   buttonTwo,
   buttonAllAction,
   buttonFullAction,
   buttonOneAction,
   buttonTwoAction,
   message,
   mode,
   onHide,
   onShow,
   showing,
   title
}) => {
   const buttonClickFull = () => {
      if (buttonAllAction) buttonAllAction()
      if (buttonFullAction) buttonFullAction()
   }
   const buttonClickOne = () => {
      if (buttonAllAction) buttonAllAction()
      if (buttonOneAction) buttonOneAction()
   }
   const buttonClickTwo = () => {
      if (buttonAllAction) buttonAllAction()
      if (buttonTwoAction) buttonTwoAction()
   }

   let loader = <div className={classNames(styles.loader)} />
   if (mode === 'success') {
      const successIcon = `icon ion-ios-checkmark ${styles.icon}`
      loader = <div className={classNames(successIcon, styles.iconSuccess, styles.iconAnim)} />
   } else if (mode === 'error') {
      const errorIcon = `icon ion-ios-close ${styles.icon}`
      loader = <div className={classNames(errorIcon, styles.iconError, styles.iconAnim)} />
   } else if (mode === 'warning') {
      const warningIcon = `icon ion-ios-information ${styles.icon}`
      loader = <div className={classNames(warningIcon, styles.iconWarning, styles.iconAnim)} />
   }

   const buttonFullElement = buttonFull && (
      <button
         className={classNames(styles.button, styles.buttonFull)}
         onClick={buttonClickFull}>
         <Text size="1" weight="bold" color="white" className={styles.title}>{buttonFull}</Text>
      </button>
   )

   const buttonOneElement = buttonOne && (
      <button
         className={classNames(styles.button, styles.buttonOne)}
         onClick={buttonClickOne}>
         <Text size="1" weight="bold" color="white" className={styles.title}>{buttonOne}</Text>
      </button>
   )

   const buttonTwoElement = buttonTwo && (
      <button
         className={classNames(styles.button, styles.buttonTwo)}
         onClick={buttonClickTwo}>
         <Text size="1" weight="bold" color="white" className={styles.title}>{buttonTwo}</Text>
      </button>
   )

   const displayClass = showing
      ? 'showNotification'
      : 'hideNotification'

   if (onHide && !showing) onHide()
   if (onShow && showing) onShow()

   return (
      <div className={classNames(styles.container, styles[displayClass])}>
         <div className={styles.notification}>
            {loader}
            <div className={styles.message}>
               <Text size="3" weight="semibold" color="white" className={styles.title}>{title}</Text>
               <Spacer size="1" />
               <Text size="2" color="gray60">{message}</Text>
            </div>
         </div>
         {buttonFullElement}
         {buttonOneElement}
         {buttonTwoElement}
      </div>
   )
}

Notification.propTypes = {
   buttonFull: React.PropTypes.string,
   buttonOne: React.PropTypes.string,
   buttonTwo: React.PropTypes.string,
   buttonAllAction: React.PropTypes.func,
   buttonFullAction: React.PropTypes.func,
   buttonOneAction: React.PropTypes.func,
   buttonTwoAction: React.PropTypes.func,
   message: React.PropTypes.string,
   mode: React.PropTypes.string,
   onHide: React.PropTypes.func,
   onShow: React.PropTypes.func,
   showing: React.PropTypes.bool,
   title: React.PropTypes.string
}

export default Notification
