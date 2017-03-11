import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Demo from './Demo'
import Button from './content/Button'
import ButtonGroup from './content/ButtonGroup'
import Form from './content/Form'
import Text from './content/Text'
import Modal from './content/Modal'
import ModalExample1 from './content/Modal/Example1'
import ModalExample2 from './content/Modal/Example2'
import ModalExample3 from './content/Modal/Example3'
import ModalExample4 from './content/Modal/Example4'
import Typography from './content/Typography'
import View from './content/View'
import ExamplesWindow from './examples/Window'

export default (
   <Route path="/" component={Demo}>
      <IndexRoute component={Typography} />
      <Route path="button" component={Button} />
      <Route path="button-group" component={ButtonGroup} />
      <Route path="form" component={Form} />
      <Route path="modal" component={Modal}>
         <Route path="example1" component={ModalExample1} />
         <Route path="example2" component={ModalExample2} />
         <Route path="example3" component={ModalExample3} />
         <Route path="example4" component={ModalExample4} />
      </Route>
      <Route path="view" component={View} />
      <Route path="text" component={Text} />
      <Route path="examples">
         <IndexRoute component={ExamplesWindow} />
         <Route path="window" component={ExamplesWindow} />
      </Route>
   </Route>
)
