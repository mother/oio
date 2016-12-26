import React, { Component } from 'react'
import {
   Button,
   ButtonGroup,
   Grid,
   GridCell,
   // Icon,
   Popover,
   Spacer,
   Text,
   Title
} from '../../src'

export default class DemoContentButton extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   render() {
      return (
         <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
            <GridCell>
               <Title>Buttons</Title>
               <Text size="2" color="gray50">
                  Buttons come in three sizes: Large, Medium, Small and Tiny. By default, if no size is specified, Medium will be used.
               </Text>
            </GridCell>
            <GridCell colspan="3">
               <ButtonGroup>
                  <Button size="large" name="Large Button" icon="ion-ios-monitor-outline" />
                  <Button size="large" name="Large Button" />
                  <Button size="large" name="Large Outline Button" outline />
               </ButtonGroup>
               <Spacer size="1" />
               <ButtonGroup>
                  <Button name="Button" icon="ion-ios-monitor-outline" />
                  <Button name="Outline Button" outline />
                  <Button name="Button" />
                  <Button color="#607D8B" name="Color Button" />
                  <Button name="Loading" mode="loading" />

                  <Button name="Popover Button" onClick={event => this.popover.show(event)} />
                  <Popover
                     ref={(popover) => { this.popover = popover }}
                     width="210px"
                     offset="18px"
                     position="right"
                     className="p18">
                     <Text size="2">
                        I am a popover!
                     </Text>
                  </Popover>
               </ButtonGroup>
               <Spacer size="1" />
               <ButtonGroup>
                  <Button size="small" name="Small Button" icon="ion-ios-monitor-outline" />
                  <Button size="small" name="Small Button" />
                  <Button size="small" name="Small Outline Button" outline />
               </ButtonGroup>
               <Spacer size="1" />
               <ButtonGroup>
                  <Button size="tiny" name="Tiny Button" icon="ion-ios-monitor-outline" />
                  <Button size="tiny" name="Tiny Button" />
                  <Button size="tiny" name="Tiny Outline Button" outline />
               </ButtonGroup>
            </GridCell>
         </Grid>
      )
   }
}
