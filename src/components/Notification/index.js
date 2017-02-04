import React, { Component } from 'react'
import classNames from 'classnames'
import Spacer from '../Spacer'
import Text from '../Text'
import styles from './styles.less'

const defaultAutoDismissTime = 2000

export default class Notification extends Component {
   static propTypes = {
      autoDismiss:  React.PropTypes.oneOfType([
         React.PropTypes.bool,
         React.PropTypes.number
      ]),
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

   constructor(props) {
      super(props)
      this.state = { showing: this.props.showing }
   }

   componentDidMount() {
      this.fireAutoDismiss()
   }

   componentWillReceiveProps(newProps) {
      if (newProps.showing !== this.state.showing) {
         this.setState({
            showing: newProps.showing
         }, this.fireAutoDismiss)
      } else if (newProps.autoDismiss) {
         this.fireAutoDismiss()
      }
   }

   fireAutoDismiss() {
      if (this.state.showing && this.props.autoDismiss) {
         const autoDismissInterval = this.props.autoDismiss === true
            ? defaultAutoDismissTime
            : this.props.autoDismiss

         // 700ms added to account for showing animation length
         setTimeout(() => this.setState({ showing: false }), autoDismissInterval + 700)
      }
   }

   render() {
      const buttonClickFull = () => {
         if (this.props.buttonAllAction) this.props.buttonAllAction()
         if (this.props.buttonFullAction) this.props.buttonFullAction()
      }
      const buttonClickOne = () => {
         if (this.props.buttonAllAction) this.props.buttonAllAction()
         if (this.props.buttonOneAction) this.props.buttonOneAction()
      }
      const buttonClickTwo = () => {
         if (this.props.buttonAllAction) this.props.buttonAllAction()
         if (this.props.buttonTwoAction) this.props.buttonTwoAction()
      }

      let loader = <div className={classNames(styles.loader)} />
      if (this.props.mode === 'success') {
         const successIcon = `icon ion-ios-checkmark ${styles.icon}`
         loader = <div className={classNames(successIcon, styles.iconSuccess, styles.iconAnim)} />
      } else if (this.props.mode === 'error') {
         const errorIcon = `icon ion-ios-close ${styles.icon}`
         loader = <div className={classNames(errorIcon, styles.iconError, styles.iconAnim)} />
      } else if (this.props.mode === 'warning') {
         const warningIcon = `icon ion-ios-information ${styles.icon}`
         loader = <div className={classNames(warningIcon, styles.iconWarning, styles.iconAnim)} />
      }

      const buttonFullElement = this.props.buttonFull && (
         <button
            className={classNames(styles.button, styles.buttonFull)}
            onClick={buttonClickFull}>
            <Text size="1" weight="bold" color="white" className={styles.title}>{this.props.buttonFull}</Text>
         </button>
      )

      const buttonOneElement = this.props.buttonOne && (
         <button
            className={classNames(styles.button, styles.buttonOne)}
            onClick={buttonClickOne}>
            <Text size="1" weight="bold" color="white" className={styles.title}>{this.props.buttonOne}</Text>
         </button>
      )

      const buttonTwoElement = this.props.buttonTwo && (
         <button
            className={classNames(styles.button, styles.buttonTwo)}
            onClick={buttonClickTwo}>
            <Text size="1" weight="bold" color="white" className={styles.title}>{this.props.buttonTwo}</Text>
         </button>
      )

      const displayClass = this.state.showing
         ? 'showNotification'
         : 'hideNotification'

      if (this.props.onHide && !this.state.showing) this.props.onHide()
      if (this.props.onShow && this.state.showing) this.props.onShow()

      return (
         <div className={classNames(styles.container, styles[displayClass])}>
            <div className={styles.notification}>
               {loader}
               <div className={styles.message}>
                  <Text size="3" weight="semibold" color="white" className={styles.title}>{this.props.title}</Text>
                  <Spacer size="1" />
                  <Text size="2" color="gray60">{this.props.message}</Text>
               </div>
            </div>
            {buttonFullElement}
            {buttonOneElement}
            {buttonTwoElement}
         </div>
      )
   }
}
