import React, { Component } from 'react'
import {
   Checkbox,
   CheckboxGroup,
   FileInput,
   Form,
   Grid,
   GridCell,
   ImageInput,
   Input,
   Radio,
   RadioGroup,
   Select,
   Spacer,
   Switch,
   Textarea,
   TitleBar,
   View
} from '../../src'
import style from '../style.less'

export default class DemoContentForm extends Component {
   handleError = (error, file) => {
      console.log(error) // eslint-disable-line no-console
   }

   handleSubmit = (data, files, formData, utils) => {
      /* eslint-disable */
      console.log(data)
      console.log(files)
      /* eslint-enable */

      return new Promise((resolve, reject) => {
         setTimeout(resolve, 2000)
      })
   }

   render() {
      return (
         <View width="100%" className={style.docs}>
            <TitleBar title="Forms" flush />
            <Spacer size="9" />

            <Grid columns="1[a] 2[b] 12[c-e]" gutter="60px">
               <GridCell colspan="2">
                  <h3>Input</h3>
               </GridCell>
               <GridCell colspan="5">
                  <View width="420px">
                     <Form
                        onSubmit={this.handleSubmit}
                        onError={this.handleError}>
                        <Input
                           name="name.last"
                           label="Event Name"
                           description=""
                           placeholder="Make it short and descriptive"
                           initialValue=""
                           rules={['required', {
                              test: (value, ctx) => value !== ctx.get('name.first'),
                              message: 'Must be different than your first name.'
                           }]}
                        />
                     </Form>
                  </View>
               </GridCell>
               <GridCell colspan="5">
                  <View width="420px">
                     <Form
                        onSubmit={this.handleSubmit}
                        onError={this.handleError}>
                        <Input
                           required
                           error="Event Name required"
                           name="name.last"
                           label="Event Name"
                           description=""
                           placeholder="Make it short and descriptive"
                           initialValue=""
                           rules={['required', {
                              test: (value, ctx) => value !== ctx.get('name.first'),
                              message: 'Must be different than your first name.'
                           }]}
                        />
                     </Form>
                  </View>
               </GridCell>
            </Grid>

            <Grid columns="1[a] 2[b] 12[c-e]" gutter="60px">
               <GridCell colspan="2">
                  <h3>Text Area</h3>
               </GridCell>
               <GridCell colspan="5">
                  <View width="420px">
                     <Form
                        onSubmit={this.handleSubmit}
                        onError={this.handleError}>
                        <Textarea
                           name="description"
                           label="Description (Optional)"
                           description="The description will appear on the schedule event page."
                           placeholder="Please enter a description"
                           initialValue=""
                           rules={['required']}
                        />
                     </Form>
                  </View>
               </GridCell>
               <GridCell colspan="5">
                  <View width="420px">
                     <Form
                        onSubmit={this.handleSubmit}
                        onError={this.handleError}>
                        <Textarea
                           required
                           error="Description required"
                           name="description"
                           label="Description"
                           description="The description will appear on the schedule event page."
                           placeholder="Please enter a description"
                           initialValue=""
                           rules={['required']}
                        />
                     </Form>
                  </View>
               </GridCell>
            </Grid>

            <Grid columns="1[a] 2[b] 12[c-e]" gutter="60px">
               <GridCell colspan="2">
                  <h3>Select</h3>
               </GridCell>
               <GridCell colspan="5">
                  <View width="420px">
                     <Form
                        onSubmit={this.handleSubmit}
                        onError={this.handleError}>
                        <Select
                           name="choice"
                           label="Date"
                           description="Which date does the schedule event take place?"
                           options={[
                              { value: '', text: 'Please select the date', disabled: true },
                              { value: 'one', text: 'Wednesday, September 12th, 2018 (Day 1)' },
                              { value: 'two', text: 'Thursday, September 13th, 2018 (Day 2)' },
                              { value: 'three', text: 'Friday, September 14th, 2018 (Day 3)' }
                           ]}
                           initialValue=""
                           rules={['required']}
                        />
                     </Form>
                  </View>
               </GridCell>
               <GridCell colspan="5">
                  <View width="420px">
                     <Form
                        onSubmit={this.handleSubmit}
                        onError={this.handleError}>
                        <Select
                           required
                           error="Date required"
                           name="choice"
                           label="Date"
                           description="Which date does the schedule event take place?"
                           options={[
                              { value: '', text: 'Please select the date', disabled: true },
                              { value: 'one', text: 'Wednesday, September 12th, 2018 (Day 1)' },
                              { value: 'two', text: 'Thursday, September 13th, 2018 (Day 2)' },
                              { value: 'three', text: 'Friday, September 14th, 2018 (Day 3)' }
                           ]}
                           initialValue=""
                           rules={['required']}
                        />
                     </Form>
                  </View>
               </GridCell>
            </Grid>

            <Grid columns="1[a] 2[b] 12[c-e]" gutter="60px">
               <GridCell colspan="2">
                  <h3>Controls</h3>
               </GridCell>
               <GridCell colspan="5">
                  <View width="420px">
                     <Form
                        onSubmit={this.handleSubmit}
                        onError={this.handleError}>
                        <RadioGroup
                           name="radio"
                           label="Radio Group"
                           initialValue="navy"
                           rules={['required']}>
                           <Grid columns="3">
                              <GridCell>
                                 <Radio value="black" label="Black" />
                              </GridCell>
                              <GridCell>
                                 <Radio value="navy" label="Navy" />
                              </GridCell>
                              <GridCell>
                                 <Radio value="pink" label="Pink" />
                              </GridCell>
                           </Grid>
                        </RadioGroup>
                        <Spacer size="6" />
                        <CheckboxGroup
                           name="checkbox"
                           label="Checkbox Group"
                           initialValue={['hockey', 'baseball']}
                           rules={[{
                              test: value => value.includes('hockey'),
                              message: 'Must contain hockey!'
                           }]}>
                           <Grid columns="3">
                              <GridCell>
                                 <Checkbox value="baseball" label="Baseball" />
                              </GridCell>
                              <GridCell>
                                 <Checkbox value="golf" label="Golf" />
                              </GridCell>
                              <GridCell>
                                 <Checkbox value="hockey" label="Hockey" />
                              </GridCell>
                           </Grid>
                        </CheckboxGroup>
                     </Form>
                  </View>
               </GridCell>
               <GridCell colspan="5">
                  <View width="420px">
                     <Form
                        onSubmit={this.handleSubmit}
                        onError={this.handleError}>
                        <Switch
                           name="notifications"
                           label="Switch"
                           initialValue
                           rules={['required']}
                        />
                     </Form>
                  </View>
               </GridCell>
            </Grid>

            <Grid columns="1[a] 2[b] 12[c-e]" gutter="60px">
               <GridCell colspan="2">
                  <h3>Upload</h3>
               </GridCell>
               <GridCell colspan="5">
                  <View width="420px">
                     <Form
                        onSubmit={this.handleSubmit}
                        onError={this.handleError}>
                        <FileInput
                           maxFileSize={5000000}
                           type="file"
                           name="document"
                           label="File Upload"
                        />
                     </Form>
                  </View>
               </GridCell>
               <GridCell colspan="5">
                  <View width="420px">
                     <Form
                        onSubmit={this.handleSubmit}
                        onError={this.handleError}>
                        <ImageInput
                           maxFileSize={5000000}
                           type="image"
                           name="avatar"
                           label="Cover Image Upload"
                           src="http://placehold.it/500x500"
                           alt="Avatar"
                           style={{
                              height: '100px',
                              width: '100px'
                           }}
                        />
                     </Form>
                  </View>
               </GridCell>
            </Grid>

         </View>
      )
   }
}
