import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Demo from './Demo'
import Overview from './content/Overview'

export default (
   <Route path="/" component={Demo}>
      <IndexRoute component={Overview} />
   </Route>
)
