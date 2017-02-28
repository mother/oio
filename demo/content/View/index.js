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
                     You can think of the <code>View</code> component as OIO‘s take on a <code>div</code>.
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
                              <p>
                                 Enter a value such as <code>16:9</code>
                                 to get a box with a width and height aspect ratio of 16:9.
                                 <br />
                                 <b>Important:</b> aspectRatio relies on the width set on the View.
                                 &nbsp;It will override any height values.
                              </p>
                           </td>
                        </tr>
                        <tr>
                           <td><b>height</b></td>
                           <td>String</td>
                           <td>-</td>
                           <td>
                              Enter a pixel-based size. ie. <code>12px</code>
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
                              <p>
                                 Enter a pixel-based size. Padding can be set with 1 unit:
                                 ie. <code>padding=&quot;12px&quot;</code>
                              </p>
                              <p>
                                 Padding can also be set with 2 or 4 units representing&nbsp;
                                 top, right, bottom, left padding.
                                 This is the same as what can be done with CSS shorthand.
                                 ie. <code>padding=&quot;12px 24px&quot;</code>
                                 ie. <code>padding=&quot;12px 24px 12px 24px&quot;</code>
                              </p>
                              <Spacer size="2" />
                              <p>
                                 <a href="https://www.w3schools.com/cssref/pr_padding.asp">
                                    Learn more about padding here
                                 </a>
                              </p>
                           </td>
                        </tr>
                        <tr>
                           <td><b>position</b></td>
                           <td>String</td>
                           <td>-</td>
                           <td>
                              Ability to set both the vertical and horizontal position of a View.
                              When setting position, enter a string like:
                              <code>vertical-option horizontal-option</code>.
                              ie. <code>position=&quot;center center&quot;</code>
                              <br /><br />
                              Available vertical options include:
                              <code>top</code> <code>middle</code> <code>bottom</code>
                              Available horizontal options include:
                              <code>left</code> <code>center</code> <code>right</code>
                           </td>
                        </tr>
                        <tr>
                           <td><b>width</b></td>
                           <td>String</td>
                           <td>-</td>
                           <td>
                              Enter a pixel-based size. ie. <code>12px</code>
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
