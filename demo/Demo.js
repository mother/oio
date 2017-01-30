import React, { Component } from 'react'

import {
   NavList,
   Notification,
   OIO,
   Spacer,
   Text,
   Title,
   View
} from '../src'

// eslint-disable-next-line no-unused-vars
import styles from '../src/foundation/styles.less'

export default class Demo extends Component {
   static propTypes = {
      children: React.PropTypes.node
   }

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
      const notification = (this.state && this.state.notification) || {}

      const navContent = [{
         name: 'Style',
         buttons: [{
            name: 'Typography',
            link: '/',
            indexLink: true
         }]
      }, {
         name: 'Components',
         buttons: [{
            name: 'Buttons',
            link: '/button'
         }, {
            name: 'Forms',
            link: '/form'
         }, {
            name: 'Message',
            link: '/message'
         }, {
            name: 'Modal',
            link: '/modal'
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
         }]
      }]

      return (
         <OIO fontFamily="Helvetica Neue" primaryColor="#879ea2">
            <View format="auto">
               <View width="210px[a-c] 240px[d] 270px[e]" height="100%" padding="36px" className="">
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
                  <Text size="2" weight="bold" color="gray40" uppercase>A Happy Style<br />Framework</Text>
                  <Spacer size="9" />
                  <NavList contents={navContent} />
               </View>
               <View format="auto" left="210px[a-c] 240px[d] 270px[e]" scroll="on">
                  <View width="100%" padding="18px 60px 18px 30px">
                     {this.props.children}
                  </View>
               </View>
            </View>
         </OIO>
      )
   }
}
