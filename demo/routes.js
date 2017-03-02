import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Demo from './Demo'
import Button from './content/Button'
import Form from './content/Form'
import FormComponents from './content/FormComponents'
import Text from './content/Text'
import Modal from './content/Modal'
import Typography from './content/Typography'
import ExamplesWindow from './examples/Window'

export default (
   <Route path="/" component={Demo}>
      <IndexRoute component={Typography} />
      <Route path="button" component={Button} />
      <Route path="form" component={Form} />
      <Route path="form-components" component={FormComponents} />
      <Route path="modal" component={Modal} />
      <Route path="text" component={Text} />

      <Route path="examples">
         <IndexRoute component={ExamplesWindow} />
         <Route path="window" component={ExamplesWindow} />
      </Route>
   </Route>
)
