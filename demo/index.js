import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Demo from './Demo'

ReactDOM.render((
   <BrowserRouter>
      <Demo />
   </BrowserRouter>
), document.getElementById('container'))
