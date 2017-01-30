import React, { Component } from 'react'
import {
   Grid,
   GridCell,
   // Icon,
   Spacer,
   Text,
   Title,
   TitleBar,
   View
} from '../../src'

import style from '../style.less'

export default class DemoContentMessage extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   render() {
      return (
         <View width="100%" className={style.docs}>
            <TitleBar title="Message" flush />
            <Spacer size="9" />
            <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
               <GridCell>
                  <Title>Message Configurations</Title>
                  <Text size="2" color="gray50">
                     Props for using the <code>Message</code> component
                  </Text>
               </GridCell>
               <GridCell colspan="3">
                  <table className={style.table}>
                     <thead>
                        <tr>
                           <th width="150px">Prop</th>
                           <th width="90px">Prop Type</th>
                           <th width="120px">Default Value</th>
                           <th>Description/Options</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td><b>propName</b></td>
                           <td>String</td>
                           <td><code>0px</code></td>
                           <td>Description...</td>
                        </tr>
                     </tbody>
                  </table>
               </GridCell>
            </Grid>
         </View>
      )
   }
}
