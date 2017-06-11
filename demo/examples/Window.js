import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
   ActionBar,
   Button,
   ButtonGroup,
   Grid,
   GridCell,
   NavTabs,
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
      const navContent = [{
         name: 'Active',
         link: '/examples/window',
         indexLink: true
      }, {
         name: 'Another Tab',
         link: '/examples/window/2'
      }]

      return (
         <View width="100%" className={style.docs}>
            <TitleBar title="Modal" flush />
            <Spacer size="9" />
            <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
               <GridCell>
                  <Title>Basic Window Example</Title>
                  <Text size="2" color="gray50">
                     This is a few common examples of what a window might look like
                     with a few of the components
                  </Text>
               </GridCell>
               <GridCell colspan="3">
                  <View className={style.docsWindow} width="100%" height="600px">
                     <TitleBar title="A Window Example" />
                     <ActionBar>
                        <NavTabs content={navContent} />
                        <ButtonGroup align="right">
                           <View padding="11px 0px">
                              <Link to="/story/add">
                                 <Button name="New Story" />
                              </Link>
                           </View>
                        </ButtonGroup>
                     </ActionBar>
                  </View>
               </GridCell>
               <GridCell colspan="4" />
               <GridCell>
                  <Title>Basic Window Example</Title>
                  <Text size="2" color="gray50">
                     This is a few common examples of what a window might look
                     like with a few of the components
                  </Text>
               </GridCell>
               <GridCell colspan="3">
                  <View className={style.docsWindow} width="100%" height="600px">
                     <TitleBar title="A Window Example" />
                     <ActionBar>
                        <NavTabs content={navContent} />
                        <ButtonGroup align="right">
                           <View padding="11px 0px">
                              <Link to="/story/add">
                                 <Button name="New Story" />
                              </Link>
                           </View>
                        </ButtonGroup>
                     </ActionBar>
                  </View>
               </GridCell>
            </Grid>
         </View>
      )
   }
}
