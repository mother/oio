import React, { Component } from 'react'
import { history as browserHistory } from 'react-router-dom'
import {
   Modal,
   View
} from '../../../../src'

export default class DemoContentModalExample2 extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   hideModal(closeURL) {
      browserHistory.push(closeURL)
   }

   render() {
      const closeURL = '/modal'
      // eslint-disable-next-line react/jsx-no-bind
      const hideModal = this.hideModal.bind(this, closeURL)

      return (
         <Modal width="900px" height="1800px" onClose={hideModal} closeURL="/modal" windowMargin="60px" animation="slideFromBottom">
            <View width="100%" padding="30px" height="300px">
               0px
            </View>
            <View width="100%" padding="30px" height="300px">
               300px
            </View>
            <View width="100%" padding="30px" height="300px">
               600px
            </View>
            <View width="100%" padding="30px" height="300px">
               900px
            </View>
            <View width="100%" padding="30px" height="300px">
               1200px
            </View>
         </Modal>
      )
   }
}
