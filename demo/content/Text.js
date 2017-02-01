import React, { Component } from 'react'
import {
   Grid,
   GridCell,
   Spacer,
   Text,
   Title,
   TitleBar,
   View
} from '../../src'

import style from '../style.less'

export default class DemoContentTypography extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   render() {
      return (
         <View width="100%" className={style.docs}>
            <TitleBar title="Text" flush />
            <Spacer size="9" />
            <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
               <GridCell>
                  <Title>Text (content and editable)</Title>
                  <Text size="2" color="gray50">
                     <p>With the <code>editable</code> prop, <code>Text</code> can be modified in place.</p>
                  </Text>
               </GridCell>
               <GridCell colspan="3">
                  <Text editable>
                     Flexitarian biodiesel kale chips, hoodie lumbersexual
                     food truck keffiyeh umami single-origin coffee franzen.
                     Celiac viral put a bird on it, farm-to-table
                     heirloom everyday carry before they sold out locavore
                     listicle stumptown. Cold-pressed single-origin coffee seitan,
                     next level biodiesel vinyl synth chia pop-up sartorial ugh
                     post-ironic. Hella bitters cardigan affogato selfies
                     thundercats gentrify, man braid schlitz normcore banjo
                     umami messenger bag sartorial. Humblebrag freegan offal,
                     mumblecore tote bag mustache venmo meditation lumbersexual.
                     Put a bird on it intelligentsia lomo gluten-free bitters marfa.
                     Meh literally try-hard ugh everyday carry.
                  </Text>
               </GridCell>
            </Grid>
         </View>
      )
   }
}
