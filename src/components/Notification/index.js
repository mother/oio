import React from 'react'
import classNames from 'classnames'
import { Spacer, Text } from '../../'
import styles from './styles.less'

export default class Notifications extends React.Component {
   static propTypes = {
      title: React.PropTypes.string,
      text: React.PropTypes.string
   }

   constructor(props, context) {
      super(props, context)

      this.state = {
         mode: 'loading'
      }
   }

   componentDidMount() {
      // For Testing only
      setTimeout(() => {
         this.setState({ mode: 'success' })
      }, 2000)
   }

   render() {
      let loader = <div className={classNames(styles.loader, styles.iconAnim)} />

      if (this.state.mode === 'success') {
         const successIcon = `icon ion-ios-checkmark ${styles.icon}`
         loader = <div className={classNames(successIcon, styles.iconAnim)} />
      }

      return (
         <div className={styles.container}>
            <div className={styles.notification}>
               {loader}
               <div className={styles.message}>
                  <Text size="1" weight="bold" color="white" className={styles.title}>{this.props.title}</Text>
                  <Spacer size="1" />
                  <Text size="2" color="gray40">{this.props.text}</Text>
               </div>
            </div>
         </div>
      )
   }
}
