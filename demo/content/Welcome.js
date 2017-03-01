import React, { Component } from 'react'
import { Link } from 'react-router'
import {
   Button,
   Grid,
   GridCell,
   GridRow,
   Spacer,
   Text,
   Title,
   TitleBar,
   View
} from '../../src'
import style from '../style.less'

export default class DemoContentModal extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   render() {
      return (
         <View width="100%" padding="30px 0px">
            <View width="100%" height="600px" className={style.welcome}>
               <View format="auto" width="600px" height="180px" position="bottom center" >
                  <center>
                     <Text size="6" weight="light" color="white">
                        OIO is a flexible, powerful and beautiful user interface framework designed by Mother Co.
                     </Text>
                  </center>
               </View>
            </View>
            <Spacer size="9" />
            <Grid width="980px" gutter="60px" columns="4">
               <GridRow>
                  <GridCell>
                     <center>
                        <Text size="2" uppercase weight="semibold">Get Started</Text>
                        <Spacer size="1" />
                        <Text size="4">
                           Read the getting started guide and get up and running with OIO fast
                        </Text>
                     </center>
                  </GridCell>
                  <GridCell>
                     <center>
                        <Text size="2" uppercase weight="semibold">Stay Tuned</Text>
                        <Spacer size="1" />
                        <Text size="4">
                           Track the OIO pipeline and release schedule
                        </Text>
                     </center>
                  </GridCell>
                  <GridCell>
                     <center>
                        <Text size="2" uppercase weight="semibold">Having Issues?</Text>
                        <Spacer size="1" />
                        <Text size="4">
                           If you are having issues, file an issue on Github
                        </Text>
                     </center>
                  </GridCell>
                  <GridCell>
                     <center>
                        <Text size="2" uppercase weight="semibold">Current Version: 1.6.0</Text>
                        <Spacer size="1" />
                        <Text size="4">
                           Check out the latest on Github
                        </Text>
                        <Spacer size="1" />
                        <a href="https://github.com/mother/oio" target="_blank">
                           <Button name="Visit Github" plain />
                        </a>
                     </center>
                  </GridCell>
               </GridRow>
            </Grid>
         </View>
      )
   }
}
