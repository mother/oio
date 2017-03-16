import React, { Component } from 'react'
import classNames from 'classnames'
import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Icon from '../Icon'
import Input from '../Form/Input'
import styles from './styles.less'

export default class Dialog extends Component {
   static propTypes = {
      onConfirm: React.PropTypes.func,
      onPrompt: React.PropTypes.func,
      text: React.PropTypes.string,
      title: React.PropTypes.string,
      type: React.PropTypes.string,
      visible: React.PropTypes.bool
   }

   static defaultProps = {
      text: 'Text',
      title: 'Title',
      type: 'alert',
      visible: false
   }

   constructor(props) {
      super(props)

      this.close = this.close.bind(this)
      this.handleCancelClick = this.handleCancelClick.bind(this)
      this.handleOKClick = this.handleOKClick.bind(this)
      this.handlePromptInputChange = this.handlePromptInputChange.bind(this)

      this.state = {
         promptInputValue: '',
         visible: props.visible
      }
   }

   componentWillReceiveProps(nextProps) {
      this.setState({
         visible: nextProps.visible
      })
   }

   close() {
      this.setState({ visible: false })
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
      const displayClass = this.state.visible ? 'showDialog' : 'hideDialog'
      const displayStyle = this.state.visible ? 'table' : 'none'

      return (
         <div
            className={classNames(styles.container, styles[displayClass])}
            style={{ display: displayStyle }}>
            <div className={styles.containerInner}>
               <div className={styles.box}>
                  <div className={styles.header}>
                     <div className={styles.headerText}>{ this.props.title }</div>
                     <div onClick={this.handleCancelClick} className={styles.headerClose}>
                        <Icon name="ion-android-close" className={styles.headerCloseButton} />
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
                           <Button onClick={this.handleCancelClick} color="#aaa" name="Cancel" plain />}
                        <Button onClick={this.handleOKClick} name="OK" />
                     </ButtonGroup>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
