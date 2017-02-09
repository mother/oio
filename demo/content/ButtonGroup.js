import React, { Component } from 'react'
import {
   Button,
   ButtonGroup,
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

export default class DemoContentButtonGroup extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   render() {
      return (
         <View width="100%" className={style.docs}>
            <TitleBar title="ButtonGroup" flush />
            <Spacer size="9" />
            <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
               <GridCell>
                  <Title>ButtonGroup Orientation</Title>
                  <Text size="2" color="gray50">
                     You can set a group of buttons to flow vertically or horizontally.&nbsp;
                     The vertical orientation is useful for uses such as having a list of options in a popover menu.
                  </Text>
               </GridCell>
               <GridCell colspan="3">
                  <View width="600px">
                     <Grid gutter="30px" width="100%" columns="4">
                        <GridCell colspan="3">
                           <Text weight="semibold" size="3">Horizontal (Default orientation)</Text>
                           <Spacer size="3" />
                           <View width="100%" height="240px" className={style.docsWindow}>
                              <ButtonGroup>
                                 <Button name="Button One" />
                                 <Button name="Button Two" />
                                 <Button name="Button Three" />
                              </ButtonGroup>
                           </View>
                        </GridCell>
                        <GridCell>
                           <Text weight="semibold" size="3">Vertical</Text>
                           <Spacer size="3" />
                           <View width="100%" height="240px" className={style.docsWindow}>
                              <ButtonGroup>
                                 <Button name="Button One" />
                                 <Button name="Button Two" />
                                 <Button name="Button Three" />
                              </ButtonGroup>
                           </View>
                        </GridCell>
                     </Grid>
                  </View>
               </GridCell>
               <GridCell>
                  <Title>ButtonGroup Configurations</Title>
                  <Text size="2" color="gray50">
                     Props for using the <code>Modal</code> component
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
                           <td><b>align</b></td>
                           <td>String</td>
                           <td><code>left</code></td>
                           <td>
                              <code>left</code>
                              <code>center</code>
                              <code>right</code>
                           </td>
                        </tr>
                        <tr>
                           <td><b>mode</b></td>
                           <td>String</td>
                           <td><code>normal</code></td>
                           <td>
                              <code>normal</code>
                              <code>segmented</code>
                           </td>
                        </tr>
                        <tr>
                           <td><b>orientation</b></td>
                           <td>String</td>
                           <td><code>horizontal</code></td>
                           <td>
                              <code>horizontal</code>
                              <code>vertical</code>
                           </td>
                        </tr>
                        <tr>
                           <td><b>spacing</b></td>
                           <td>String</td>
                           <td><code>6px</code></td>
                           <td>
                              pass a number with pixel-based unit
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
