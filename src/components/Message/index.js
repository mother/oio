import React, { Component } from 'react'
import classNames from 'classnames'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import styles from './styles.less'

export default class Message extends Component {
   static propTypes = {
      showing: React.PropTypes.bool
   }

   static defaultProps = {
      showing: false
   }

   render() {
      const displayClass = this.props.showing ? 'showMessage' : 'hideMessage'
      const display = this.props.showing ? 'table' : 'none'

      return (
         <div
            className={classNames(styles.container, styles[displayClass])}
            style={{ display }}>
            <div className={styles.containerInner}>
               <div className={styles.box}>
                  <div className={styles.header}>
                     <div className={styles.headerText}>Title</div>
                     <div className={styles.headerClose}>
                        <div className={classNames('icon', 'ion-ios-close-empty', styles.headerCloseButton)} />
                     </div>
                  </div>
                  <div className={styles.content}>Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message</div>
                  <div className={styles.footer}>
                  <ButtonGroup align="right">
                     <Button color="#ccc" name="Cancel" />
                     <Button color="#ccc" name="OK" />
                  </ButtonGroup>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
