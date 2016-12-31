import React, { Component } from 'react'
import {
   Grid,
   GridCell,
   Text,
   Title
} from '../../src'

export default class DemoExampleWindow extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   render() {
      return (
         <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
            <GridCell>
               <Title>Buttons</Title>
               <Text size="2" color="gray50">
                  Buttons come in four sizes: Large, Medium, Small and Tiny. By default, if no size is specified, Medium will be used.
               </Text>
            </GridCell>
            <GridCell colspan="3">
               Hello
            </GridCell>
         </Grid>
      )
   }
}
