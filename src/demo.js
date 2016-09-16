import React from 'react'
import ReactDOM from 'react-dom'
import Kit from './'

class Demo extends React.Component {
   render() {
      return (
         <div>Hello</div>
      )
   }
}

ReactDOM.render(<Demo />, document.getElementById('container'))
