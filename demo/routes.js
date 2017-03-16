import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Demo from './Demo'
import Button from './content/Button'
import ButtonGroup from './content/ButtonGroup'
import Dialog from './content/Dialog'
import Form from './content/Form'
import Modal from './content/Modal'
import Text from './content/Text'
import Typography from './content/Typography'
import ExamplesWindow from './examples/Window'

export default (
   <Route path="/" component={Demo}>
      <IndexRoute component={Typography} />
      <Route path="button" component={Button} />
      <Route path="button-group" component={ButtonGroup} />
      <Route path="dialog" component={Dialog} />
      <Route path="form" component={Form} />
      <Route path="modal" component={Modal} />
      <Route path="text" component={Text} />

      <Route path="examples">
         <IndexRoute component={ExamplesWindow} />
         <Route path="window" component={ExamplesWindow} />
      </Route>
   </Route>
)
