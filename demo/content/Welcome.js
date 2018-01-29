import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
   Button,
   Grid,
   GridCell,
   GridRow,
   Spacer,
   Text,
   View
} from '../../src'
import style from '../style.less'

export default class DemoContentModal extends Component {
   static propTypes = {
      contents: PropTypes.array
   }

   render() {
      return (
         <View width="100%" padding="0px[a-d] 30px 0px[e]">
            <Grid width2="980px" gutter="1px" columns="4">
               <GridCell colspan="4">
                  <View width="100%" height="600px" className={style.welcome}>
                     <View format="auto" width="600px" height="360px" position="bottom center" >
                        <center>
                           <Text size="10" weight="light" color="white">OIO</Text>
                           <Spacer size="3" />
                           <Text size="6" weight="light" color="white">
                              OIO is a flexible, powerful and beautiful user interface&nbsp;
                              framework designed by Mother Co.
                           </Text>
                        </center>
                     </View>
                  </View>
                  <Spacer size="3" />
               </GridCell>
               <GridRow>
                  <GridCell>
                     <View className={style.welcomeBlock} padding="60px" aspectRatio="4:3">
                        <center>
                           <Text size="1" uppercase weight="bold">Get Started</Text>
                           <Spacer size="3" />
                           <Text size="4">
                              Read the getting started guide and get up and running with OIO fast
                           </Text>
                        </center>
                     </View>
                  </GridCell>
                  <GridCell>
                     <View className={style.welcomeBlock} padding="60px" aspectRatio="4:3">
                        <center>
                           <Text size="1" uppercase weight="bold">Stay Tuned</Text>
                           <Spacer size="3" />
                           <Text size="4">
                              Track the OIO pipeline and release schedule
                           </Text>
                        </center>
                     </View>
                  </GridCell>
                  <GridCell>
                     <View className={style.welcomeBlock} padding="60px" aspectRatio="4:3">
                        <center>
                           <Text size="1" uppercase weight="bold">Having Issues?</Text>
                           <Spacer size="3" />
                           <Text size="4">
                              If you are having issues, file an issue on Github
                           </Text>
                        </center>
                     </View>
                  </GridCell>
                  <GridCell>
                     <View className={style.welcomeBlock} padding="60px" aspectRatio="4:3">
                        <center>
                           <Text size="1" uppercase weight="bold">Current Version: 1.6.0</Text>
                           <Spacer size="3" />
                           <Text size="4">
                              Check out the latest on Github
                           </Text>
                           <Spacer size="3" />
                           <a
                              href="https://github.com/mother/oio"
                              rel="noreferrer noopener"
                              target="_blank">
                              <Button name="Visit Github" size="tiny" outline />
                           </a>
                        </center>
                     </View>
                  </GridCell>
               </GridRow>
            </Grid>
         </View>
      )
   }
}
