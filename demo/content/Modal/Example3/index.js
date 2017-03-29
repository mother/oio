import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import {
   Modal,
   View
} from '../../../../src'

export default class DemoContentModalExample3 extends Component {
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
         <Modal mode="fill" windowMargin="0px[a-b] 30px[c-e]" onClose={hideModal} closeURL={closeURL}>
            <View width="100%" padding="30px" height="300px">
               Standard Modal Window
            </View>
         </Modal>
      )
   }
}
