import React, { Component } from 'react'
import classNames from 'classnames'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Input from '../Form/Input'
import styles from './styles.less'

export default class Message extends Component {
   static propTypes = {
      onConfirm: React.PropTypes.func,
      onPrompt: React.PropTypes.func,
      text: React.PropTypes.string,
      title: React.PropTypes.string,
      type: React.PropTypes.string,
      showing: React.PropTypes.bool
   }

   static defaultProps = {
      promptInputValue: '',
      text: 'Message',
      title: 'Title',
      type: 'alert',
      showing: false
   }

   constructor(props) {
      super(props)

      this.close = this.close.bind(this)
      this.handleCancelClick = this.handleCancelClick.bind(this)
      this.handleOKClick = this.handleOKClick.bind(this)
      this.handlePromptInputChange = this.handlePromptInputChange.bind(this)

      this.state = {
         promptInputValue: '',
         showing: props.showing
      }
   }

   componentWillReceiveProps(nextProps) {
      this.setState({
         showing: nextProps.showing
      })
   }

   close() {
      this.setState({ showing: false })
   }

   handleCancelClick() {
      if (this.props.type === 'confirm') {
         this.props.onConfirm(false)
      } else if (this.props.type === 'prompt') {
         this.setState({ promptInputValue: '' })
      }
      this.close()
   }

   handleOKClick() {
      if (this.props.type === 'confirm') {
         this.props.onConfirm(true)
      } else if (this.props.type === 'prompt') {
         this.props.onPrompt(this.state.promptInputValue)
         this.setState({ promptInputValue: '' })
      }
      this.close()
   }

   handlePromptInputChange(event) {
      this.setState({
         promptInputValue: event.target.value
      })
   }

   render() {
      const displayClass = this.state.showing ? 'showMessage' : 'hideMessage'
      const display = this.state.showing ? 'table' : 'none'

      return (
         <div
            className={classNames(styles.container, styles[displayClass])}
            style={{ display }}>
            <div className={styles.containerInner}>
               <div className={styles.box}>
                  <div className={styles.header}>
                     <div className={styles.headerText}>{ this.props.title }</div>
                     <div onClick={this.handleCancelClick} className={styles.headerClose}>
                        <div className={classNames('icon', 'ion-ios-close-empty', styles.headerCloseButton)} />
                     </div>
                  </div>
                  <div className={styles.content}>
                     { this.props.text }
                     { this.props.type === 'prompt' &&
                        <Input
                           onChange={this.handlePromptInputChange}
                           className={styles.promptInput}
                           placeholder="Please enter your email"
                           type="email"
                           value={this.state.promptInputValue}
                        />
                     }
                  </div>
                  <div className={styles.footer}>
                     <ButtonGroup align="right">
                        {this.props.type !== 'alert' &&
                           <Button onClick={this.handleCancelClick} color="#CCC" name="Cancel" />}
                        <Button onClick={this.handleOKClick} name="OK" />
                     </ButtonGroup>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
