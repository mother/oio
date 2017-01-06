import React, { Component } from 'react'
import {
   Grid,
   GridCell,
   Spacer,
   Text,
   Title,
   TitleBar,
   View
} from '../../src'

import style from '../style.less'

export default class DemoExampleWindow extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   render() {
      return (
         <View width="100%" className={style.docs}>
            <TitleBar title="Modal" flush />
            <Spacer size="9" />
            <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
               <GridCell>
                  <Title>Basic Window Example</Title>
                  <Text size="2" color="gray50">
                     This is a few common examples of what a window might look like with a few of the components
                  </Text>
               </GridCell>
               <GridCell colspan="3">
                  <View className={style.docsWindow} width="100%" height="600px">
                     <TitleBar title="A Window Example" />
                  </View>
               </GridCell>
            </Grid>
         </View>
      )
   }
}
