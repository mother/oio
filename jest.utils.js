import PropTypes from 'prop-types'
import React from 'react'

global.TestErrorBoundary = class TestErrorBoundary extends React.Component {
   state = { errorMsg: '' }

   static propTypes = {
      children: PropTypes.node.isRequired
   }

   componentDidCatch(error, info) {
      this.setState({ errorMsg: error.message })
   }

   render() {
      return this.state.errorMsg !== ''
         ? <div>{this.state.errorMsg}</div>
         : this.props.children
   }
}
