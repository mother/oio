import React, { Component } from 'react'
import {
   Button,
   Checkbox,
   CheckboxGroup,
   DateInput,
   FileInput,
   Grid,
   GridCell,
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
   render() {
      return (
         <View width="100%" className={style.docs}>
            <TitleBar title="Form Components" flush />
            <Spacer size="9" />
            <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
               <GridCell>
                  <Title>Form Components</Title>
               </GridCell>
               <GridCell colspan="3">
                  <View width="420px">
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
                              rules={['required']}
                           />
                        </div>
                     </div>
                     <Input
                        name="name.last"
                        label="Last Name"
                        placeholder="Please enter your last name"
                        rules={['required', {
                           test: (value, ctx) => value !== ctx.get('name.first'),
                           message: 'Must be different than your first name.'
                        }]}
                     />
                     <Input
                        name="email"
                        label="Email"
                        placeholder="Please enter your email"
                        rules={[
                           'required',
                           { test: 'email', message: 'Enter a valid email!' },
                           { test: value => value.length > 8, message: 'At least 8 characters' }
                        ]}
                     />
                     <DateInput
                        name="date.start"
                        label="Start Date"
                        placeholder="Please enter a start date"
                     />
                     <Spacer size="2" />
                     <DateInput
                        name="date.end"
                        label="End Date"
                        placeholder="Please enter an end date"
                        enableTime
                     />
                     <Spacer size="2" />
                     <Textarea
                        name="description"
                        label="Description"
                        placeholder="Please enter the description"
                        rules={['required']}
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
                        rules={['required']}
                     />
                     <RadioGroup
                        name="gender"
                        label="Gender"
                        rules={['required']}>
                        <Grid columns="3">
                           <GridCell>
                              <Radio value="male" label="Male" />
                           </GridCell>
                           <GridCell>
                              <Radio value="female" label="Female" />
                           </GridCell>
                           <GridCell>
                              <Radio value="undisclosed" label="Undisclosed" />
                           </GridCell>
                        </Grid>
                     </RadioGroup>
                     <Spacer size="3" />
                     <CheckboxGroup
                        name="sports"
                        label="Sports"
                        rules={[
                           { test: value => value.includes('hockey'), message: 'Must contain hockey!' }
                        ]}>
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
                        <Switch
                           name="notifications"
                           label="Notifications"
                           rules={['required']}
                        />
                        <Spacer size="9" />
                     </View>
                     <View width="100%">
                        <Button name="Save Changes" type="submit" autoFormRespond />
                     </View>
                  </View>
               </GridCell>
            </Grid>
         </View>
      )
   }
}
