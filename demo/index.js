import React from 'react'
import ReactDOM from 'react-dom'
import { Router, history as browserHistory } from 'react-router-dom'
import OIO from '../src/components/OIO'
import routes from './routes'

ReactDOM.render(
   <OIO>
      <Router history={browserHistory} routes={routes} />
   </OIO>
, document.getElementById('container'))
