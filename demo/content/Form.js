import React, { Component } from 'react'
import {
   Avatar,
   Button,
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
   Title,
   TitleBar,
   View
} from '../../src'
import style from '../style.less'

export default class DemoContentForm extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   constructor(props, context) {
      super(props, context)

      this.handleError = this.handleError.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
   }

   handleError(error, file) {
      console.log(error) // eslint-disable-line no-console
   }

   handleSubmit(data, files, formData) {
      return new Promise((resolve, reject) => {
         console.log('Submitting...', data, files) // eslint-disable-line no-console
         setTimeout(resolve, 2000)
      })
   }

   render() {
      const titleHeading = '1'
      const titleSize = '4'

      return (
         <View width="100%" className={style.docs}>
            <TitleBar title="Forms" flush />
            <Spacer size="9" />
            <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
               <GridCell>
                  <Title>Forms</Title>
               </GridCell>
               <GridCell colspan="3">
                  <View width="420px">
                     <Form
                        onSubmit={this.handleSubmit}
                        onError={this.handleError}>
                        <ImageInput
                           maxFileSize={5000000}
                           type="image"
                           name="avatar"
                           label="Avatar"
                           src="http://placehold.it/500x500"
                           alt="Avatar"
                           style={{
                              height: '100px',
                              width: '100px'
                           }}
                        />
                        <Spacer size="2" />
                        <FileInput
                           maxFileSize={5000000}
                           type="file"
                           name="document"
                           label="Document"
                        />
                        <div>
                           <div>
                              <Input
                                 name="name.first"
                                 label="First Name"
                                 placeholder="Please enter your first name"
                                 defaultValue="Jared"
                                 rules={['required']}
                              />
                           </div>
                        </div>
                        <Input
                           name="name.last"
                           label="Last Name"
                           placeholder="Please enter your last name"
                           defaultValue="Reich"
                           rules={['required', {
                              test: (value, ctx) => value !== ctx.get('name.first'),
                              message: 'Must be different than your first name.'
                           }]}
                        />
                        <Input
                           name="email"
                           label="Email"
                           placeholder="Please enter your email"
                           defaultValue="jared@mother.co"
                           rules={[
                              'required',
                              { test: 'email', message: 'Enter a valid email!' },
                              { test: value => value.length > 8, message: 'At least 8 characters' }
                           ]}
                        />
                        <Textarea
                           name="description"
                           label="Description"
                           placeholder="Please enter the subtitle"
                        />
                        <Select
                           name="choice"
                           label="A Choice"
                           options={[
                              { value: '', text: 'Please select a choice' },
                              { value: 'one', text: 'One' },
                              { value: 'two', text: 'Two' },
                              { value: 'three', text: 'Three' }
                           ]}
                           value={null || 'two'}
                           rules={['required']}
                        />
                        <RadioGroup
                           name="gender"
                           label="Gender">
                           <Grid columns="3">
                              <GridCell>
                                 <Radio value="male" label="Male" />
                              </GridCell>
                              <GridCell>
                                 <Radio value="female" label="Female" />
                              </GridCell>
                              <GridCell>
                                 <Radio value="undecided" label="Undecided" />
                              </GridCell>
                           </Grid>
                        </RadioGroup>
                        <Spacer size="3" />
                        <CheckboxGroup
                           name="sports"
                           label="Sports"
                           rules={['required']}
                           value={['golf', 'hockey']}>
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
                        <Spacer size="3" />
                        <View width="100%">
                           <Switch name="notifications" label="Notifications" />
                           <Spacer size="9" />
                        </View>
                        <View width="100%">
                           <Button name="Save Changes" type="submit" />
                        </View>

                     </Form>
                  </View>
               </GridCell>
               <GridCell>
                  Grid Cell 2
               </GridCell>
               <GridCell colspan="3">
                  <Title heading={titleHeading} size={titleSize}>Avatar</Title>
                  <Avatar src="http://placekitten.com/g/500/500" style={{ width: '100px', height: '100px' }} />
               </GridCell>
            </Grid>
         </View>
      )
   }
}
