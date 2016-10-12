import React from 'react'
import classNames from 'classnames'
import { Spacer, Text } from '../../'
import styles from './styles.less'

const Notification = ({
   buttonFull,
   buttonOne,
   buttonTwo,
   buttonAllAction,
   buttonActionFull,
   buttonOneAction,
   buttonTwoAction,
   message,
   mode,
   showing,
   title
}) => {
   const buttonClickFull = () => {
      if (buttonAllAction) buttonAllAction()
      if (buttonActionFull) buttonActionFull()
   }
   const buttonClickOne = () => {
      if (buttonAllAction) buttonAllAction()
      if (buttonOneAction) buttonOneAction()
   }
   const buttonClickTwo = () => {
      if (buttonAllAction) buttonAllAction()
      if (buttonTwoAction) buttonTwoAction()
   }

   let loader = <div className={classNames(styles.loader, styles.iconAnim)} />
   if (mode === 'success') {
      const successIcon = `icon ion-ios-checkmark ${styles.icon}`
      loader = <div className={classNames(successIcon, styles.iconSuccess, styles.iconAnim)} />
   } else if (mode === 'error') {
      const errorIcon = `icon ion-ios-close ${styles.icon}`
      loader = <div className={classNames(errorIcon, styles.iconError, styles.iconAnim)} />
   } else if (mode === 'alert') {
      const alertIcon = `icon ion-ios-information ${styles.icon}`
      loader = <div className={classNames(alertIcon, styles.iconAlert, styles.iconAnim)} />
   }

   const buttonFullJSX = buttonFull
      ? (<button
         className={classNames(styles.button, styles.buttonFull)}
         onClick={buttonClickFull}>
         <Text size="1" weight="bold" color="white" className={styles.title}>{buttonFull}</Text>
      </button>)
      : null

   const buttonOneJSX = buttonOne
      ? (<button
         className={classNames(styles.button, styles.buttonOne)}
         onClick={buttonClickOne}>
         <Text size="1" weight="bold" color="white" className={styles.title}>{buttonOne}</Text>
      </button>)
      : null

   const buttonTwoJSX = buttonTwo
      ? (<button
         className={classNames(styles.button, styles.buttonTwo)}
         onClick={buttonClickTwo}>
         <Text size="1" weight="bold" color="white" className={styles.title}>{buttonTwo}</Text>
      </button>)
      : null

   const styleDisplay = showing
      ? {
         right: '10px'
      }
      : {
         right: '-400px'
      }

   return (
      <div className={classNames(styles.container)} style={styleDisplay}>
         <div className={styles.notification}>
            {loader}
            <div className={styles.message}>
               <Text size="1" weight="bold" color="white" className={styles.title}>{title}</Text>
               <Spacer size="1" />
               <Text size="2" color="gray40">{message}</Text>
            </div>
         </div>
         {buttonFullJSX}
         {buttonOneJSX}
         {buttonTwoJSX}
      </div>
   )
}

Notification.propTypes = {
   buttonFull: React.PropTypes.string,
   buttonOne: React.PropTypes.string,
   buttonTwo: React.PropTypes.string,
   buttonAllAction: React.PropTypes.func,
   buttonActionFull: React.PropTypes.func,
   buttonOneAction: React.PropTypes.func,
   buttonTwoAction: React.PropTypes.func,
   message: React.PropTypes.string,
   mode: React.PropTypes.string,
   showing: React.PropTypes.bool,
   title: React.PropTypes.string
}

export default Notification
