import React, { Component } from 'react'
import {
   Grid,
   GridCell,
   GridRow,
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
                     It is the core OIO component you should use to structure your pages,&nbsp;
                     layouts and components for your application. You can think of the&nbsp;
                     <code>View</code> component as OIO‘s take on a <code>div</code>.
                  </Text>
               </GridCell>
               <GridRow>
                  <GridCell>
                     <Title>View Example 1</Title>
                     <Text size="2" color="gray50">
                        Example of a View component where format equals <code>float</code>
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <View width="100%" height="360px" className={style.docsWindow}>
                        <View width="30%" height="100%" padding="30px" className="bgGray10">
                           <Text weight="semibold">View 1</Text>
                           <Spacer size="2" />
                           <code>View</code> with format of <code>fixed</code> with width of&nbsp;
                           <code>20%</code>&nbsp;
                           and height of <code>100%</code> and padding of <code>30px</code>
                        </View>
                        <View width="70%" height="100%" padding="30px 60px">
                           <Text weight="semibold">View 2</Text>
                           <Spacer size="2" />
                           <code>View</code> with format of <code>fixed</code> with width of&nbsp;
                           <code>80%</code>&nbsp;
                           and height of <code>100%</code> and padding of <code>30px 60px</code>
                        </View>
                     </View>
                  </GridCell>
               </GridRow>
               <GridRow>
                  <GridCell>
                     <Title>View Example 2</Title>
                     <Text size="2" color="gray50">
                        Similar to previous example, but implemented slightly differently.
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <View width="100%" height="360px" className={style.docsWindow}>
                        <View width="30%" height="100%" padding="30px" className="bgGray10">
                           <Text weight="semibold">View 1</Text>
                           <Spacer size="2" />
                           <code>View</code> with format of <code>fixed</code> with width of&nbsp;
                           <code>30%</code>&nbsp;
                           and height of <code>100%</code> and padding of <code>30px</code>
                        </View>
                        <View format="auto" left="30%" padding="30px 60px" scroll="on">
                           <Text weight="semibold">View 2 (Scroll Me!)</Text>
                           <Spacer size="2" />
                           <code>View</code> with format of <code>auto</code> with left of&nbsp;
                           <code>30%</code> and padding of <code>30px 60px</code> and &nbsp;
                           scroll is set to <code>on</code>
                           <Spacer size="5" />
                           Fingerstache next level pickled, sriracha swag portland disrupt.
                           Schlitz synth pourover, activated charcoal kale chips echo park
                           narwhal viral drinking vinegar. Quinoa kitsch PBRB, everyday carry
                           godard woke occupy. Hot chicken lumbersexual swag,
                           lomo flexitarian post-ironic crucifix vegan bitters.
                           Williamsburg lo-fi fam biodiesel, disrupt whatever health goth fashion
                           axe kickstarter pitchfork brooklyn pabst hot chicken food truck brunch.
                           Af neutra lyft schlitz. Activated charcoal biodiesel af food truck
                           succulents, readymade fam fashion axe mixtape vape portland pinterest
                           irony narwhal. Fap chicharrones normcore plaid. Keffiyeh irony schlitz,
                           roof party poke paleo hashtag skateboard
                           succulents gochujang glutenfree pok pok locavore.
                           Iceland put a bird on it four loko prism affogato kinfolk,
                           franzen etsy listicle fixie. Williamsburg hashtag pinterest lyft
                           cornhole listicle. Chambray gochujang hammock YOLO small batch.
                           Typewriter microdosing direct trade jean shorts,
                           godard messenger bag hexagon street art copper mug fashion
                           axe chartreuse mixtape authentic fap. Helvetica pug twee,
                           wolf bespoke subway tile kickstarter chicharrones single-origin coffee
                           viral mumblecore flannel heirloom.
                        </View>
                     </View>
                  </GridCell>
               </GridRow>
               <GridRow>
                  <GridCell>
                     <Title>View Example 3</Title>
                     <Text size="2" color="gray50">
                        Example of a View component that sticks to the top right corner
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <View width="100%" height="360px" className={style.docsWindow}>
                        <View format="auto" padding="30px 330px 30px 30px" scroll="on">
                           <Text weight="semibold">View 1 (Scroll Me)</Text>
                           <Spacer size="2" />
                           <code>View</code> with format of <code>auto</code> with padding&nbsp;
                           of <code>30px 330px 30px 30px</code> and scroll is set to <code>on</code>
                           <Spacer size="5" />
                           Fingerstache next level pickled, sriracha swag portland disrupt.
                           Schlitz synth pourover, activated charcoal kale chips echo park
                           narwhal viral drinking vinegar. Quinoa kitsch PBRB, everyday carry
                           godard woke occupy. Hot chicken lumbersexual swag,
                           lomo flexitarian post-ironic crucifix vegan bitters.
                           Williamsburg lo-fi fam biodiesel, disrupt whatever health goth fashion
                           axe kickstarter pitchfork brooklyn pabst hot chicken food truck brunch.
                           Af neutra lyft schlitz. Activated charcoal biodiesel af food truck
                           succulents, readymade fam fashion axe mixtape vape portland pinterest
                           irony narwhal. Fap chicharrones normcore plaid. Keffiyeh irony schlitz,
                           roof party poke paleo hashtag skateboard
                           succulents gochujang glutenfree pok pok locavore.
                           Iceland put a bird on it four loko prism affogato kinfolk,
                           franzen etsy listicle fixie. Williamsburg hashtag pinterest lyft
                           cornhole listicle. Chambray gochujang hammock YOLO small batch.
                           Typewriter microdosing direct trade jean shorts,
                           godard messenger bag hexagon street art copper mug fashion
                           axe chartreuse mixtape authentic fap. Helvetica pug twee,
                           wolf bespoke subway tile kickstarter chicharrones single-origin coffee
                           viral mumblecore flannel heirloom.
                        </View>
                        <View
                           format="auto"
                           className="bgGray10"
                           width="300px"
                           height="180px"
                           padding="30px"
                           position="top right">
                           <Text weight="semibold">View 2 (I Stick)</Text>
                           <Spacer size="2" />
                           <code>View</code> with format of <code>auto</code> with width of&nbsp;
                           <code>300px</code>&nbsp;
                           and height of <code>180px</code> and padding of <code>30px</code>&nbsp;
                           and position of <code>top right</code>
                        </View>
                     </View>
                  </GridCell>
               </GridRow>
               <GridRow>
                  <GridCell>
                     <Title>View Example 4</Title>
                     <Text size="2" color="gray50">
                        Example of a View component that is positioned in the middle center
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <View width="100%" height="360px" className={style.docsWindow}>
                        <View width="300px" height="120px" position="middle center" className="bgGray10">
                           <Text weight="semibold">View 1</Text>
                           <Spacer size="2" />
                           <code>View</code> with format of <code>fixed</code> with width of&nbsp;
                           <code>360px</code>&nbsp;
                           and height of <code>120px</code> and position of&nbsp;
                           <code>middle center</code>
                        </View>
                     </View>
                  </GridCell>
               </GridRow>
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
