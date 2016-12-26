import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Demo from './Demo'
import Button from './content/Button'
import Form from './content/Form'
import Typography from './content/Typography'

export default (
   <Route path="/" component={Demo}>
      <IndexRoute component={Typography} />
      <Route path="button" component={Button} />
      <Route path="form" component={Form} />
   </Route>
)
