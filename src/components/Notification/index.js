import React from 'react'
import classNames from 'classnames'
import { Spacer, Text } from '../../'
import styles from './styles.less'

export default class Notifications extends React.Component {
   static propTypes = {
      buttonFull: React.PropTypes.string,
      buttonOne: React.PropTypes.string,
      buttonTwo: React.PropTypes.string,
      buttonActionAll: React.PropTypes.func,
      buttonActionFull: React.PropTypes.func,
      buttonActionOne: React.PropTypes.func,
      buttonActionTwo: React.PropTypes.func,
      message: React.PropTypes.string,
      mode: React.PropTypes.string,
      showing: React.PropTypes.bool,
      title: React.PropTypes.string
   }

   constructor(props) {
      super(props)

      this.buttonClickFull = this.buttonClickFull.bind(this)
      this.buttonClickOne = this.buttonClickOne.bind(this)
      this.buttonClickTwo = this.buttonClickTwo.bind(this)
   }

   componentDidMount() {
      // if (this.props.autoDismiss) {
      //    setTimeout()
      // }
   }

   buttonClickFull() {
      if (this.props.buttonActionAll) this.props.buttonActionAll()
      if (this.props.buttonActionFull) this.props.buttonActionFull()
   }
   buttonClickOne() {
      if (this.props.buttonActionAll) this.props.buttonActionAll()
      if (this.props.buttonActionOne) this.props.buttonActionOne()
   }
   buttonClickTwo() {
      if (this.props.buttonActionAll) this.props.buttonActionAll()
      if (this.props.buttonActionTwo) this.props.buttonActionTwo()
   }

   render() {
      let loader = <div className={classNames(styles.loader, styles.iconAnim)} />
      if (this.props.mode === 'success') {
         const successIcon = `icon ion-ios-checkmark ${styles.icon}`
         loader = <div className={classNames(successIcon, styles.iconSuccess, styles.iconAnim)} />
      } else if (this.props.mode === 'error') {
         const errorIcon = `icon ion-ios-close ${styles.icon}`
         loader = <div className={classNames(errorIcon, styles.iconError, styles.iconAnim)} />
      } else if (this.props.mode === 'alert') {
         const alertIcon = `icon ion-ios-information ${styles.icon}`
         loader = <div className={classNames(alertIcon, styles.iconAlert, styles.iconAnim)} />
      }

      const buttonFull = this.props.buttonFull
         ? (<button
            className={classNames(styles.button, styles.buttonFull)}
            onClick={this.buttonClickFull}>
            <Text size="1" weight="bold" color="white" className={styles.title}>{this.props.buttonFull}</Text>
         </button>)
         : null

      const buttonOne = this.props.buttonOne
         ? (<button
            className={classNames(styles.button, styles.buttonOne)}
            onClick={this.buttonClickOne}>
            <Text size="1" weight="bold" color="white" className={styles.title}>{this.props.buttonOne}</Text>
         </button>)
         : null

      const buttonTwo = this.props.buttonTwo
         ? (<button
            className={classNames(styles.button, styles.buttonOne)}
            onClick={this.buttonClickTwo}>
            <Text size="1" weight="bold" color="white" className={styles.title}>{this.props.buttonTwo}</Text>
         </button>)
         : null

      const styleDisplay = this.props.showing
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
                  <Text size="1" weight="bold" color="white" className={styles.title}>{this.props.title}</Text>
                  <Spacer size="1" />
                  <Text size="2" color="gray40">{this.props.message}</Text>
               </div>
            </div>
            {buttonFull}
            {buttonOne}
            {buttonTwo}
         </div>
      )
   }
}
