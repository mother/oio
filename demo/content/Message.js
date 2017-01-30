import React, { Component } from 'react'
import {
   Button,
   Grid,
   GridCell,
   Message,
   Spacer,
   Text,
   Title,
   TitleBar,
   View
} from '../../src'

import style from '../style.less'

export default class DemoContentMessage extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   constructor(props) {
      super(props)

      this.handleAlertClick = this.handleAlertClick.bind(this)
      this.handleConfirmClick = this.handleConfirmClick.bind(this)
      this.handlePromptClick = this.handlePromptClick.bind(this)

      this.state = {
         message: { showing: false }
      }
   }

   handleAlertClick() {
      this.setState({
         message: {
            ...this.state.message,
            text: 'This is a test alert message.',
            type: 'alert',
            showing: true
         }
      })
   }

   handleConfirmClick() {
      this.setState({
         message: {
            ...this.state.message,
            onConfirm: result => console.log(result), // eslint-disable-line
            text: 'This is a test confirm message. Are you sure?',
            title: 'Confirm',
            type: 'confirm',
            showing: true
         }
      })
   }

   handlePromptClick() {
      this.setState({
         message: {
            ...this.state.message,
            onPrompt: result => console.log(result), // eslint-disable-line
            text: 'This is a test prompt message. Enter your email:',
            title: 'Prompt',
            type: 'prompt',
            showing: true
         }
      })
   }

   render() {
      const message = (this.state && this.state.message) || {}

      return (
         <div>
            <Message
               onConfirm={message.onConfirm}
               onPrompt={message.onPrompt}
               text={message.text}
               title={message.title}
               type={message.type}
               showing={message.showing}
            />
            <View width="100%" className={style.docs}>
               <TitleBar title="Message" flush />
               <Spacer size="9" />
               <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
                  <GridCell>
                     <Title>Message Alert</Title>
                     <Text size="2" color="gray50">
                        Displays an alert message with a specified message and an OK button.
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <Button onClick={this.handleAlertClick} name="Alert" size="large" />
                  </GridCell>
               </Grid>
               <Spacer size="4" />
               <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
                  <GridCell>
                     <Title>Message Confirm</Title>
                     <Text size="2" color="gray50">Displays a dialog box with a specified message, along with an OK and a Cancel button.</Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <Button onClick={this.handleConfirmClick} name="Confirm" size="large" />
                  </GridCell>
               </Grid>
               <Spacer size="4" />
               <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
                  <GridCell>
                     <Title>Message Prompt</Title>
                     <Text size="2" color="gray50">
                        Displays a dialog box that prompts the user for input.
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <Button onClick={this.handlePromptClick} name="Prompt" size="large" />
                  </GridCell>
               </Grid>
               <Spacer size="4" />
               <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
                  <GridCell>
                     <Title>Message Configurations</Title>
                     <Text size="2" color="gray50">
                        Props for using the <code>Message</code> component
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <table className={style.table}>
                        <thead>
                           <tr>
                              <th width="150px">Prop</th>
                              <th width="90px">Prop Type</th>
                              <th width="120px">Default Value</th>
                              <th>Description/Options</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td><b>propName</b></td>
                              <td>String</td>
                              <td><code>0px</code></td>
                              <td>Description...</td>
                           </tr>
                        </tbody>
                     </table>
                  </GridCell>
               </Grid>
            </View>
         </div>
      )
   }
}
