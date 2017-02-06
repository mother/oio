import React, { Component } from 'react'
import {
   Button,
   Grid,
   GridCell,
   Dialog,
   Spacer,
   Text,
   Title,
   TitleBar,
   View
} from '../../src'

import style from '../style.less'

export default class DemoContentDialog extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   constructor(props) {
      super(props)

      this.handleAlertClick = this.handleAlertClick.bind(this)
      this.handleConfirmClick = this.handleConfirmClick.bind(this)
      this.handlePromptClick = this.handlePromptClick.bind(this)

      this.state = {
         dialog: { visible: false }
      }
   }

   handleAlertClick() {
      this.setState({
         dialog: {
            ...this.state.dialog,
            text: 'This is a test alert dialog.',
            type: 'alert',
            visible: true
         }
      })
   }

   handleConfirmClick() {
      this.setState({
         dialog: {
            ...this.state.dialog,
            onConfirm: result => console.log(result), // eslint-disable-line
            text: 'This is a test confirm dialog. Are you sure?',
            title: 'Confirm',
            type: 'confirm',
            visible: true
         }
      })
   }

   handlePromptClick() {
      this.setState({
         dialog: {
            ...this.state.dialog,
            onPrompt: result => console.log(result), // eslint-disable-line
            text: 'This is a test prompt dialog. Enter your email:',
            title: 'Prompt',
            type: 'prompt',
            visible: true
         }
      })
   }

   render() {
      const dialog = (this.state && this.state.dialog) || {}

      return (
         <div>
            <Dialog
               onConfirm={dialog.onConfirm}
               onPrompt={dialog.onPrompt}
               text={dialog.text}
               title={dialog.title}
               type={dialog.type}
               visible={dialog.visible}
            />
            <View width="100%" className={style.docs}>
               <TitleBar title="Dialog" flush />
               <Spacer size="9" />
               <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
                  <GridCell>
                     <Title>Dialog Alert</Title>
                     <Text size="2" color="gray50">
                        Displays an alert dialog with a specified message and an OK button.
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <Button onClick={this.handleAlertClick} name="Alert" size="large" />
                  </GridCell>
               </Grid>
               <Spacer size="4" />
               <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
                  <GridCell>
                     <Title>Dialog Confirm</Title>
                     <Text size="2" color="gray50">Displays a dialog box with a specified message, along with an OK and a Cancel button.</Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <Button onClick={this.handleConfirmClick} name="Confirm" size="large" />
                  </GridCell>
               </Grid>
               <Spacer size="4" />
               <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
                  <GridCell>
                     <Title>Dialog Prompt</Title>
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
                     <Title>Dialog Configurations</Title>
                     <Text size="2" color="gray50">
                        Props for using the <code>Dialog</code> component
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
                              <td><b>onConfirm</b></td>
                              <td>Function</td>
                              <td><code>N/A</code></td>
                              <td>
                                 <code>onConfirm: result =&gt; &#123;&#125;</code>
                                 <br />
                                 <span>where <code>result</code> is true or false</span>
                              </td>
                           </tr>
                           <tr>
                              <td><b>onPrompt</b></td>
                              <td>Function</td>
                              <td><code>N/A</code></td>
                              <td>
                                 <code>onPrompt: result =&gt; &#123;&#125;</code>
                                 <br />
                                 <span>where <code>result</code> is text submitted</span>
                              </td>
                           </tr>
                           <tr>
                              <td><b>text</b></td>
                              <td>String</td>
                              <td><code>Text</code></td>
                              <td>Text content of dialog</td>
                           </tr>
                           <tr>
                              <td><b>title</b></td>
                              <td>String</td>
                              <td><code>Title</code></td>
                              <td>Title of dialog</td>
                           </tr>
                           <tr>
                              <td><b>type</b></td>
                              <td>String</td>
                              <td><code>alert</code></td>
                              <td>
                                 Type of dialog.
                                 Can be <code>alert</code>,
                                 <code>confirm</code>,
                                 or <code>prompt</code>
                              </td>
                           </tr>
                           <tr>
                              <td><b>visible</b></td>
                              <td>Boolean</td>
                              <td><code>false</code></td>
                              <td>
                                 Boolean value to toggle whether
                                 <code>Dialog</code> is visible or not.
                              </td>
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
