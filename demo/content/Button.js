import React, { Component } from 'react'
import {
   Button,
   ButtonGroup,
   Grid,
   GridCell,
   GridRow,
   OIO,
   Popover,
   Spacer,
   Text,
   Title,
   TitleBar,
   View
} from '../../src'
import style from '../style.less'

export default class DemoContentButton extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   render() {
      return (
         <View width="100%" className={style.docs}>
            <TitleBar title="Buttons" flush />
            <Spacer size="9" />
            <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
               <GridRow>
                  <GridCell>
                     <Title>Button Styles</Title>
                     <Text size="2" color="gray50">
                        The <code>Button</code> component has a number of style combinations that can be mixed and matched
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <ButtonGroup>
                        <Button name="Button" />
                        <Button name="Button" icon="ion-ios-plus" />
                        <Button name="Outline" outline />
                        <Button name="Plain" plain />
                     </ButtonGroup>
                     <Spacer size="1" />
                     <ButtonGroup>
                        <Button color="#b6c2c4" name="Custom Color" />
                        <Button color="#b6c2c4" name="Custom Color Outline" outline />
                        <Button color="#b6c2c4" name="Custom Color Plain" plain />
                     </ButtonGroup>
                     <Spacer size="1" />
                     <ButtonGroup>
                        <Button name="Popover Button" onClick={event => this.popover.show(event)} />
                        <Popover
                           ref={(popover) => { this.popover = popover }}
                           width="210px"
                           offset="18px"
                           position="left"
                           className="p18">
                           <Text size="2">
                              I am a popover!
                           </Text>
                        </Popover>
                     </ButtonGroup>
                  </GridCell>
               </GridRow>
               <GridRow>
                  <GridCell>
                     <Title>Button Sizes</Title>
                     <Text size="2" color="gray50">
                        The <code>Button</code> component comes in four sizes: <code>large</code>, <code>medium</code>, <code>small</code> and <code>tiny</code>. By default, if no size is specified, medium will be used.
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <OIO primaryColor="#b6c2c4">
                        <ButtonGroup>
                           <Button size="large" name="Large Button" />
                           <Button size="large" name="Icon" icon="ion-ios-plus" />
                           <Button size="large" name="Outline" outline />
                           <Button size="large" name="Plain" plain />
                        </ButtonGroup>
                        <Spacer size="1" />
                        <ButtonGroup>
                           <Button name="Medium Button" />
                           <Button name="Icon" icon="ion-ios-plus" />
                           <Button name="Outline" outline />
                           <Button name="Plain" plain />
                        </ButtonGroup>
                        <Spacer size="1" />
                        <ButtonGroup>
                           <Button size="small" name="Small Button" />
                           <Button size="small" name="Icon" icon="ion-ios-plus" />
                           <Button size="small" name="Outline" outline />
                           <Button size="small" name="Plain" plain />
                        </ButtonGroup>
                        <Spacer size="1" />
                        <ButtonGroup>
                           <Button size="tiny" name="Tiny Button" />
                           <Button size="tiny" name="Icon" icon="ion-ios-plus" />
                           <Button size="tiny" name="Outline" outline />
                           <Button size="tiny" name="Plain" plain />
                        </ButtonGroup>
                     </OIO>
                  </GridCell>
               </GridRow>
               <GridRow>
                  <GridCell>
                     <Title>Button Modes</Title>
                     <Text size="2" color="gray50">
                        The <code>Button</code> component has 4 different&nbsp;
                        <b>modes</b>: <code>disabled</code> <code>loading</code>
                        <code>normal</code> <code>pulsing</code>.&nbsp;
                        This is useful for quickly communicating different stages
                        &nbsp;of an interaction to a user.
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <ButtonGroup>
                        <Button name="Disabled" mode="disabled" />
                        <Button name="Loading" mode="loading" />
                        <Button name="Save Changes" mode="pulsing" />
                        <Button name="Normal" mode="normal" />
                     </ButtonGroup>
                  </GridCell>
               </GridRow>
               <GridCell>
                  <Title>Button Configurations</Title>
                  <Text size="2" color="gray50">
                     Props for using the <code>Button</code> component
                  </Text>
               </GridCell>
               <GridCell colspan="3">
                  <table className={style.table}>
                     <thead>
                        <tr>
                           <th>Prop</th>
                           <th>Prop Type</th>
                           <th>Default Value</th>
                           <th>Description/Options</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td><b>icon</b></td>
                           <td>String</td>
                           <td>-</td>
                           <td>
                              Set ioinicon icon class name
                           </td>
                        </tr>
                        <tr>
                           <td><b>mode</b></td>
                           <td>String</td>
                           <td>
                              <code>normal</code>
                           </td>
                           <td>
                              If set to <code>loading</code>,
                              a loading indicator will be shown in place in the button.
                              Mode can also be set to <code>disabled</code> <code>normal</code> and <code>pulsing</code>
                           </td>
                        </tr>
                        <tr>
                           <td><b>name</b></td>
                           <td>String</td>
                           <td />
                           <td>Text that appears inside the button</td>
                        </tr>
                        <tr>
                           <td><b>size</b></td>
                           <td>String</td>
                           <td>
                              <code>medium</code>
                           </td>
                           <td>
                              <code>large</code>
                              <code>medium</code>
                              <code>small</code>
                              <code>tiny</code>
                           </td>
                        </tr>
                        <tr>
                           <td><b>outline</b></td>
                           <td>Boolean</td>
                           <td>
                              <code>false</code>
                           </td>
                           <td>Gives button an outline appearance</td>
                        </tr>
                        <tr>
                           <td><b>rounded</b></td>
                           <td>Boolean</td>
                           <td>
                              <code>false</code>
                           </td>
                           <td>Gives button a rounded appearance</td>
                        </tr>
                     </tbody>
                  </table>
               </GridCell>
            </Grid>
         </View>
      )
   }
}
