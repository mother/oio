import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { NavList, Notification, OIO, Spacer, Text, Title, View } from '../src'
import ButtonDemo from './content/Button'
import ButtonGroupDemo from './content/ButtonGroup'
import FormDemo from './content/Form'
import TextDemo from './content/Text'
import ModalDemo from './content/Modal'
import ViewDemo from './content/View'
import Welcome from './content/Welcome'
import ExamplesWindow from './examples/Window'
import ExamplesGrid from './examples/Grid'

// eslint-disable-next-line no-unused-vars
import styles from '../src/foundation/styles.less'

export default class Demo extends Component {
   constructor(props) {
      super(props)
      this.state = {}
   }

   render() {
      const titleHeading = '1'
      const notification = this.state.notification || {}

      const navContent = [{
         name: 'Overview',
         buttons: [{
            name: 'Welcome',
            link: '/',
            exact: true
         }]
      }, {
         name: 'Components',
         buttons: [{
            name: 'Button',
            link: '/button'
         }, {
            name: 'ButtonGroup',
            link: '/button-group'
         }, {
            name: 'Form',
            link: '/form'
         }, {
            name: 'Modal',
            link: '/modal'
         }, {
            name: 'View',
            link: '/view'
         }, {
            name: 'Text',
            link: '/text'
         }]
      }, {
         name: 'Navigation',
         buttons: [{
            name: 'Tabs',
            link: '/navigation/tabs'
         }, {
            name: 'List',
            link: '/navigation/list'
         }]
      }, {
         name: 'Examples',
         buttons: [{
            name: 'Window',
            link: '/examples/window'
         }, {
            name: 'Grid',
            link: '/example-grid'
         }]
      }]

      return (
         <OIO fontFamily="Helvetica Neue" primaryColor="#879ea2">
            <View format="auto">
               <View width="210px[a-c] 240px[d] 270px[e]" height="100%" padding="48px 36px" className="">
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
                  <Title heading={titleHeading} weight="normal" size="7">OIO</Title>
                  <Text size="2" weight="bold" color="gray40" uppercase>
                     A Happy Style<br />
                     Framework
                  </Text>
                  <Spacer size="9" />
                  <NavList contents={navContent} />
               </View>
               <View format="auto" left="210px[a-c] 240px[d] 270px[e]" scroll="on">
                  <View
                     width="100%"
                     padding="18px[a-d] 18px 60px 18px 30px[e]">
                     <Route exact path="/" component={Welcome} />
                     <Route path="/button" component={ButtonDemo} />
                     <Route path="/button-group" component={ButtonGroupDemo} />
                     <Route path="/form" component={FormDemo} />
                     <Route path="/modal" component={ModalDemo} />
                     <Route path="/view" component={ViewDemo} />
                     <Route path="/text" component={TextDemo} />
                     <Route path="/examples" component={ExamplesWindow} />
                     <Route path="/example-grid" component={ExamplesGrid} />
                  </View>
               </View>
            </View>
         </OIO>
      )
   }
}
