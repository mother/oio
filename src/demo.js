import React from 'react'
import ReactDOM from 'react-dom'
import {
   ActionBar,
   Avatar,
   Button,
   ButtonGroup,
   // Checkboxes,
   // Cover,
   Form,
   Grid,
   GridCell,
   // Icon,
   Input,
   Nav,
   Notification,
   Popover,
   Radio,
   RadioGroup,
   Select,
   Spacer,
   Text,
   Textarea,
   Title,
   TitleBar,
   ToolBar,
   View
} from './'

import styles from './foundation/styles.less' // eslint-disable-line no-unused-vars

class Demo extends React.Component {
   constructor(props, context) {
      super(props, context)

      this.state = {}
   }

   onSubmit(data) {
      console.log(data) // eslint-disable-line
   }

   onError(errors) {
      console.log(errors) // eslint-disable-line
   }

   render() {
      const titleHeading = '1'
      const titleSize = '4'
      const notification = (this.state && this.state.notification) || {}

      return (
         <View format="auto">
            <View width="20%" height="100%" padding="24px[c] 38px[d]">
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
               <Title heading={titleHeading} weight="light" size="9">OIO</Title>
               <Text weight="bold" color="gray40">A Happy Style Framework</Text>
               <Spacer size="4" />
               <Nav type="directory">
                  <a href="">Example</a>
                  <a href="">Actionbar</a>
                  <a href="">Avatar</a>
                  <a href="">Button</a>
                  <a href="">Button Group</a>
                  <a href="">Grid</a>
                  <a href="">GridCell</a>
                  <a href="">Icon</a>
                  <a href="">Spacer</a>
                  <a href="">Text</a>
                  <a href="">Title</a>
                  <a href="">Titlebar</a>
                  <a href="">Toolbar</a>
                  <a href="">View</a>
               </Nav>
            </View>
            <View width="80%" height="100%" padding="36px">
               <TitleBar title="Example" />
               <ActionBar>
                  <Nav type="tabs">
                     <a href="" className="active">Tab 1</a>
                     <a href="">Tab 2</a>
                     <a href="">Tab 3</a>
                  </Nav>
                  <ButtonGroup align="right">
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
               </ActionBar>
               <View width="100%" height="75%" format="float" scroll="on">
                  <Grid columns="1[a] 2[b] 4[c] 4[d] 4[e]" gutter="30">
                     <GridCell>
                        <Form
                           onSubmit={data => this.onSubmit(data)}
                           onError={error => this.onError(error)}>
                           <Input
                              name="title"
                              label="Title"
                              placeholder="Please enter the title"
                              initialValue="Title"
                              rules={[
                                 'required'
                              ]}
                           />
                           <Input
                              name="email"
                              label="Email"
                              placeholder="Please enter your email"
                              rules={[
                                 'required',
                                 { test: 'email', message: 'Enter a valid email' },
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
                                 { value: 'one', text: 'One' },
                                 { value: 'two', text: 'Two' },
                                 { value: 'three', text: 'Three' }
                              ]}
                           />
                           <RadioGroup name="gender" label="Gender">
                              <Radio value="male" label="Male" />
                              <Radio value="female" label="Female" />
                              <Radio value="undecided" label="Undecided" />
                           </RadioGroup>
                           <Button name="Save Changes" type="submit" />
                        </Form>
                     </GridCell>
                     <GridCell>
                        Grid Cell 2
                     </GridCell>
                     <GridCell>
                        <Title heading={titleHeading} size={titleSize}>Avatar</Title>
                        <Avatar src="http://placekitten.com/g/500/500" style={{ width: '100px', height: '100px' }} />
                     </GridCell>
                     <GridCell colspan="4">
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

                        <ButtonGroup align="right">
                           <Button size="large" name="Big Button" icon="ion-ios-monitor-outline" />
                           <Button size="large" name="Big Button" />
                           <Button name="Big Button" outline />
                        </ButtonGroup>
                     </GridCell>
                  </Grid>

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
               </View>
               <ToolBar>
                  <ButtonGroup align="right">
                     <Button name="Previous" />
                     <Button name="Next" mode="loading" />
                  </ButtonGroup>
               </ToolBar>
            </View>
         </View>
      )
   }
}

ReactDOM.render(<Demo />, document.getElementById('container'))
