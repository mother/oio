import React, { Component } from 'react'
import {
   Grid,
   GridCell,
   Spacer,
   Text,
   Title,
   TitleBar,
   View
} from '../../../src'

import style from '../../style.less'

export default class DemoContentView extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   render() {
      return (
         <View width="100%" className={style.docs}>
            <TitleBar title="View" flush />
            <Spacer size="9" />
            <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
               <GridCell>
                  <Title>Introduction</Title>
               </GridCell>
               <GridCell colspan="3">
                  <Text size="6" weight="light">
                     The View component is probably one of the most important components within OIO.
                     It is the core OIO component you should use to structure your pages, layouts and components for your application.
                     You can think of the <code>View</code> component as OIO's take on a <code>div</code>.
                  </Text>
               </GridCell>
               <GridCell>
                  <Title>View Configurations</Title>
                  <Text size="2" color="gray50">
                     Props for using the <code>View</code> component
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
                           <td><b>aspectRatio</b></td>
                           <td>String</td>
                           <td>-</td>
                           <td>
                              Enter a value such as <code>16:9</code> to get a box with a width and height aspect ratio of 16:9. <b>Important:</b> aspectRatio relies on the width set on the View. It will override any height values.
                           </td>
                        </tr>
                        <tr>
                           <td><b>height</b></td>
                           <td>String</td>
                           <td>-</td>
                           <td>
                              -
                           </td>
                        </tr>
                        <tr>
                           <td><b>format</b></td>
                           <td>String</td>
                           <td><code>float</code></td>
                           <td>
                              <code>float</code>
                              <code>auto</code>
                           </td>
                        </tr>
                        <tr>
                           <td><b>padding</b></td>
                           <td>String</td>
                           <td>-</td>
                           <td>

                           </td>
                        </tr>
                        <tr>
                           <td><b>position</b></td>
                           <td>String</td>
                           <td>-</td>
                           <td>

                           </td>
                        </tr>
                        <tr>
                           <td><b>width</b></td>
                           <td>String</td>
                           <td>-</td>
                           <td>
                              -
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </GridCell>
            </Grid>
         </View>
      )
   }
}
