import React, { Component } from 'react'
import { Modal, View } from '../../../../src'

export default class DemoContentModalExample1 extends Component {
   static propTypes = {
      history: React.PropTypes.object
   }

   hideModal(closeURL) {
      this.props.history.push(closeURL)
   }

   render() {
      const closeURL = '/modal'
      // eslint-disable-next-line react/jsx-no-bind
      const hideModal = this.hideModal.bind(this, closeURL)

      return (
         <Modal width="900px" height="540px" onClose={hideModal} closeURL={closeURL}>
            <View width="100%" padding="30px" height="300px">
               Standard Modal Window
            </View>
         </Modal>
      )
   }
}
