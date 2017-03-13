import React, { Component } from 'react'
import { Link } from 'react-router'
import {
   Button,
   ButtonGroup,
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

export default class DemoContentModal extends Component {
   static propTypes = {
      children: React.PropTypes.node
   }

   render() {
      return (
         <View width="100%" className={style.docs}>
            <TitleBar title="Modal" flush />
            <Spacer size="9" />
            <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
               <GridRow>
                  <GridCell>
                     <Title>Modal Fixed Mode</Title>
                     <Text size="2" color="gray50">
                        Examples of: a standard modal window that is&nbsp;
                        vertically and horizontally centered; a modal window that is taller&nbsp;
                        than the browser window height. Notice how you can scroll the Modal.
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <ButtonGroup>
                        <Link to="/modal/example1">
                           <Button name="Standard Modal Window" />
                        </Link>
                        <Link to="/modal/example2">
                           <Button name="Tall Modal Window" />
                        </Link>
                     </ButtonGroup>
                  </GridCell>
               </GridRow>
               <GridRow>
                  <GridCell>
                     <Title>Modal Fill Mode</Title>
                     <Text size="2" color="gray50">
                        Example of the modal window in <code>fill</code> mode.&nbsp;
                        Modal windows in this mode will fill the browser window.
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <ButtonGroup>
                        <Link to="/modal/example3">
                           <Button name="Fill Modal Window" />
                        </Link>
                     </ButtonGroup>
                  </GridCell>
               </GridRow>
               <GridRow>
                  <GridCell>
                     <Title>Responsive Modal</Title>
                     <Text size="2" color="gray50">
                        Modal window whose dimensions and mode change depending on&nbsp;
                        browser window size.
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <ButtonGroup>
                        <Link to="/modal/example4">
                           <Button name="Fill Modal Window" />
                        </Link>
                     </ButtonGroup>
                  </GridCell>
               </GridRow>
               <GridCell>
                  <Title>Modal Configurations</Title>
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
                           <td><b>animation</b></td>
                           <td>String</td>
                           <td><code>scaleIn</code></td>
                           <td>
                              <code>scaleIn</code>
                              <code>slideFromBottom</code>
                           </td>
                        </tr>
                        <tr>
                           <td><b>windowMargin</b></td>
                           <td>String</td>
                           <td><code>0px</code></td>
                           <td>
                              It is the pixel from top, left, right, bottom positions of the modal window.
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
                           <td><b>mode</b></td>
                           <td>String</td>
                           <td><code>fixed</code></td>
                           <td>
                              <p>
                                 <code>fixed</code> is the default mode. When in <code>fixed</code>
                                 mode, the Modal window will be a fixed sized and centered&nbsp;
                                 horizontally (and vertically when possible).
                              </p>
                              <p>
                                 When in <code>fill</code> mode, the Modal window will fill to the
                                 width and height of the browser window, less the&nbsp;
                                 <code>windowMargin</code>
                              </p>
                           </td>
                        </tr>
                        <tr>
                           <td><b>closeURL</b></td>
                           <td>String</td>
                           <td>-</td>
                           <td>
                              URL that user is directed to when they close the <code>Modal</code>
                           </td>
                        </tr>
                        <tr>
                           <td><b>onClose</b></td>
                           <td>Function</td>
                           <td>-</td>
                           <td>
                              Pass a function that will fire when Modal window is closed
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
            {this.props.children}
         </View>
      )
   }
}
