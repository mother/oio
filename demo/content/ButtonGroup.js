import React, { Component } from 'react'
import {
   Button,
   ButtonGroup,
   Grid,
   GridCell,
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
                  <Title>ButtonGroup Modes</Title>
                  <Text size="2" color="gray50">
                     ButtonGroup modes are different ways to visually present a set of&nbsp;
                     buttons. Often it is useful to present them as a vertical <code>list</code>
                     or grouped more tightly together like a <code>segmented</code> control.
                  </Text>
               </GridCell>
               <GridCell colspan="3">
                  <View width="100%">
                     <Grid gutter="30px" width="100%" columns="1">
                        <GridCell>
                           <Text weight="semibold" size="3">Normal</Text>
                           <Spacer size="3" />
                           <View width="100%">
                              <ButtonGroup>
                                 <Button name="Button One" />
                                 <Button name="Button Two" outline />
                                 <Button name="Button Three" outline />
                              </ButtonGroup>
                           </View>
                        </GridCell>
                        <GridCell>
                           <Text weight="semibold" size="3">List</Text>
                           <Spacer size="3" />
                           <View width="150px" height="180px" className={style.docsWindow}>
                              <ButtonGroup mode="list">
                                 <Button size="small" name="Button One" />
                                 <Button size="small" name="Button Two" />
                                 <Button size="small" name="Button Three" />
                              </ButtonGroup>
                           </View>
                        </GridCell>
                        <GridCell>
                           <Text weight="semibold" size="3">Segmented Control</Text>
                           <Spacer size="3" />
                           <View width="100%">
                              <ButtonGroup mode="segmented">
                                 <Button link="/button-group" indexLink size="small" name="Button One" />
                                 <Button size="small" name="Button Two" />
                                 <Button size="small" name="Button Three" />
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
                              <p>
                                 <code>left</code>
                                 <code>center</code>
                                 <code>right</code>
                              </p>
                              <p>
                                 This prop only applies
                                 when <code>ButtonGroup</code> is in the <code>normal</code> mode.
                              </p>
                           </td>
                        </tr>
                        <tr>
                           <td><b>mode</b></td>
                           <td>String</td>
                           <td><code>normal</code></td>
                           <td>
                              <code>normal</code>
                              <code>segmented</code>
                              <code>list</code>
                           </td>
                        </tr>
                        <tr>
                           <td><b>spacing</b></td>
                           <td>String</td>
                           <td><code>6px</code></td>
                           <td>
                              <p>
                                 Pass a number with pixel-based unit.
                              </p>
                              <p>
                                 This prop only applies
                                 when <code>ButtonGroup</code> is in the <code>normal</code> mode.
                              </p>
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
