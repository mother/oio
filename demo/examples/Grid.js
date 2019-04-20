import React, { Component } from 'react'
import {
   Grid,
   GridCell,
   Spacer,
   Text,
   TitleBar,
   View
} from '../../src'
import style from '../style.less'

export default class DemoExampleWindow extends Component {
   render() {
      return (
         <View width="100%" className={style.docs}>
            <TitleBar title="Grid" flush />
            <Spacer size="9" />
            <Grid gutter="60px" columns="1[a] 2[a-c] 3[d-e]" hideBottomGutter>
               <GridCell>
                  Cell 1
               </GridCell>
               <GridCell>
                  Cell 2
               </GridCell>
               <GridCell>
                  Cell 3
               </GridCell>
               <GridCell>
                  Cell 4
               </GridCell>
               <GridCell>
                  Cell 5
               </GridCell>
            </Grid>
            <Text>Some Text at the end</Text>
         </View>
      )
   }
}
