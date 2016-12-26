import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'

import OIO from '../src/components/OIO'
import routes from './routes'

ReactDOM.render(
   <OIO>
      <Router history={browserHistory} routes={routes} />
   </OIO>
, document.getElementById('container'))
