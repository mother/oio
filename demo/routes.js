import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Demo from './Demo'
import Analytics from './content/Analytics'
import AnalyticsExample from './content/Analytics/Example'
import Button from './content/Button'
import Form from './content/Form'
import Text from './content/Text'
import Modal from './content/Modal'
import View from './content/View'
import Welcome from './content/Welcome'
import ExamplesWindow from './examples/Window'

export default (
   <Route path="/" component={Demo}>
      <IndexRoute component={Welcome} />
      <Route path="analytics" component={Analytics}>
         <Route path="example" component={AnalyticsExample} />
      </Route>
      <Route path="button" component={Button} />
      <Route path="form" component={Form} />
      <Route path="modal" component={Modal} />
      <Route path="view" component={View} />
      <Route path="text" component={Text} />
      <Route path="examples">
         <IndexRoute component={ExamplesWindow} />
         <Route path="window" component={ExamplesWindow} />
      </Route>
   </Route>
)
