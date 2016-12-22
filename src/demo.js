import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
   Avatar,
   Button,
   ButtonGroup,
   Checkbox,
   CheckboxGroup,
   // Cover,
   FileInput,
   Form,
   Grid,
   GridCell,
   // Icon,
   Input,
   NavList,
   Notification,
   OIO,
   Popover,
   Radio,
   RadioGroup,
   Select,
   Spacer,
   Switch,
   Text,
   Textarea,
   Title,
   View
} from './'

import styles from './foundation/styles.less' // eslint-disable-line no-unused-vars

class Demo extends Component {
   constructor(props, context) {
      super(props, context)
      this.state = {}
   }

   handleSubmit(data, files, formData) {
      console.log(data, files, formData) // eslint-disable-line
      // Simulate delayed promise
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve()
         }, 2000)
      })
   }

   handleError(errors) {
      console.log(errors) // eslint-disable-line
   }

   render() {
      const titleHeading = '1'
      const titleSize = '4'
      const notification = (this.state && this.state.notification) || {}

      const navContent = [{
         name: 'Components',
         buttons: [{
            name: 'Buttons',
            link: '/',
            indexLink: true
         }, {
            name: 'Forms',
            link: '/forms'
         }]
      }]

      return (
         <OIO>
            <View format="auto">
               <View width="300px" height="100%" padding="48px 48px" className="bgGray10">
                  <Notification
                     buttonAllAction={notification.buttonAllAction}
                     buttonFull={notification.buttonFull}
                     buttonFullAction={notification.buttonFullAction}
                     buttonOne={notification.buttonOne}
                     buttonOneAction={notification.buttonOneAction}
                     buttonTwo={notification.buttonTwo}
                     buttonTwoAction={notification.buttonTwoAction}
                     message={notification.message}
                     mode={notification.mode}
                     onHide={notification.onHide}
                     onShow={notification.onShow}
                     showing={notification.showing}
                     title={notification.title}
                  />
                  <Title heading={titleHeading} weight="light" size="7">OIO</Title>
                  <Text weight="bold" color="gray40">A Happy Style Framework</Text>
                  <Spacer size="9" />
                  <NavList contents={navContent} />
               </View>
               <View format="auto" left="300px" scroll="on">
                  <View padding="60px 60px">
                     <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
                        <GridCell>
                           <Title>Buttons</Title>
                        </GridCell>
                        <GridCell colspan="3">
                           <ButtonGroup>
                              <Button size="large" name="Large Button" icon="ion-ios-monitor-outline" />
                              <Button size="large" name="Large Button" />
                              <Button size="large" name="Large Outline Button" outline />
                           </ButtonGroup>
                           <Spacer size="1" />
                           <ButtonGroup>
                              <Button name="Outline Button" outline />
                              <Button name="Button" />
                              <Button color="#607D8B" name="Color Button" />
                              <Button name="Loading" mode="loading" />

                              <Button name="Popover Button" onClick={event => this.popover.show(event)} />
                              <Popover
                                 ref={(popover) => { this.popover = popover }}
                                 width="300px"
                                 offset="18px"
                                 position="right"
                                 className="p18">
                                 I am a popover!
                              </Popover>
                           </ButtonGroup>
                        </GridCell>
                        <GridCell>
                           <Title>Forms</Title>
                        </GridCell>
                        <GridCell colspan="3">
                           <View width="420px">
                              <Form
                                 onSubmit={(data, files, formData) => this.handleSubmit(data, files, formData)}
                                 onError={error => this.handleError(error)}>
                                 <FileInput
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
                                          value="Jared"
                                          rules={['required']}
                                       />
                                    </div>
                                 </div>
                                 <Input
                                    name="name.last"
                                    label="Last Name"
                                    placeholder="Please enter your last name"
                                    value="Reich"
                                    rules={['required', {
                                       test: (value, ctx) => value !== ctx.get('name.first'),
                                       message: 'Must be different than your first name.'
                                    }]}
                                 />
                                 <Input
                                    name="email"
                                    label="Email"
                                    placeholder="Please enter your email"
                                    value="jared@mother.co"
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
                                       <GridCell><Radio value="male" label="Male" /></GridCell>
                                       <GridCell>
                                          <div>
                                             <div>
                                                <Radio value="female" label="Female" />
                                             </div>
                                          </div>
                                       </GridCell>
                                       <GridCell><Radio value="undecided" label="Undecided" /></GridCell>
                                    </Grid>
                                 </RadioGroup>
                                 <Spacer size="6" />
                                 <CheckboxGroup
                                    name="sports"
                                    label="Sports"
                                    rules={['required']}
                                    value={null || ['golf', 'hockey']}>
                                    <Grid columns="3">
                                       <GridCell><Checkbox value="baseball" label="Baseball" /></GridCell>
                                       <GridCell>
                                          <div>
                                             <div>
                                                <Checkbox value="golf" label="Golf" />
                                             </div>
                                          </div>
                                       </GridCell>
                                       <GridCell><Checkbox value="hockey" label="Hockey" /></GridCell>
                                    </Grid>
                                 </CheckboxGroup>
                                 <Switch name="notifications" label="Notifications" />
                                 <Button name="Save Changes" type="submit" />
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

                        <GridCell>
                           <Title>Typography</Title>
                        </GridCell>
                        <GridCell colspan="3">
                           <Text size="10">This is some text</Text>
                           <Text size="9">This is some text</Text>
                           <Text size="8">This is some text</Text>
                           <Text size="7">This is some text</Text>
                           <Text size="6">This is some text</Text>
                           <Text size="5">This is some text</Text>
                           <Text size="4">This is some text</Text>
                           <Text size="3">This is some text</Text>
                           <Text size="2">This is some text</Text>
                           <Text size="1">This is some text</Text>

                           <p>
                              Offal tilde blog venmo sartorial, crucifix leggings
                              pork belly bitters. Banh mi iPhone cardigan tote bag.
                              Man bun narwhal pickled shoreditch kogi bespoke.
                              Vegan photo booth ethical, trust fund asymmetrical
                              neutra DIY banjo craft beer chia humblebrag church-key
                              hammock. Retro actually cold-pressed next level tofu vegan.
                              Shabby chic kogi mumblecore williamsburg. Mlkshk kale
                              chips venmo, synth pabst vegan lomo waistcoat whatever.
                           </p>

                           <p>
                              Narwhal selvage mixtape humblebrag messenger bag.
                              Meditation hella thundercats kitsch intelligentsia yr.
                              Umami ennui pug mlkshk you probably havent heard of
                              them, butcher gochujang four dollar toast kickstarter
                              single-origin coffee pabst brooklyn meditation waistcoat
                              kinfolk. Hashtag four dollar toast street art wolf
                              lumbersexual, cornhole bespoke farm-to-table 3 wolf
                              moon scenester slow-carb pop-up pitchfork.
                              Taxidermy pabst offal affogato, biodiesel echo park narwhal.
                              Master cleanse food truck artisan hammock, quinoa ugh
                              keffiyeh truffaut chia. Messenger bag knausgaard
                              lomo yuccie roof party.
                           </p>

                           <p>
                              Flexitarian biodiesel kale chips, hoodie lumbersexual
                              food truck keffiyeh umami single-origin coffee franzen.
                              Celiac viral put a bird on it, farm-to-table
                              heirloom everyday carry before they sold out locavore
                              listicle stumptown. Cold-pressed single-origin coffee seitan,
                              next level biodiesel vinyl synth chia pop-up sartorial ugh
                              post-ironic. Hella bitters cardigan affogato selfies
                              thundercats gentrify, man braid schlitz normcore banjo
                              umami messenger bag sartorial. Humblebrag freegan offal,
                              mumblecore tote bag mustache venmo meditation lumbersexual.
                              Put a bird on it intelligentsia lomo gluten-free bitters marfa.
                              Meh literally try-hard ugh everyday carry.
                           </p>
                        </GridCell>
                     </Grid>
                  </View>
               </View>
            </View>
         </OIO>
      )
   }
}

ReactDOM.render(<Demo />, document.getElementById('container'))
