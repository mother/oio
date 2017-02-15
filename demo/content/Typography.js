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
            <TitleBar title="Typography" flush />
            <Spacer size="9" />
            <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
               <GridCell>
                  <Title>Text Sizes</Title>
                  <Text size="2" color="gray50">
                     <p>The size prop can be used for both the <code>Text</code> and <code>Title</code> component. The default size for the <code>Text</code> component is 3.</p>
                     <p>As a general guideline, when using multiple text sizes, it is best to use sizes at least 2 units apart (ie. 4,6,8)</p>
                  </Text>
               </GridCell>
               <GridCell colspan="3">
                  <Text size="10">Size 10 Text</Text>
                  <Text size="9">Size 9 Text</Text>
                  <Text size="8">Size 8 Text</Text>
                  <Text size="7">Size 7 Text</Text>
                  <Text size="6">Size 6 Text</Text>
                  <Text size="5">Size 5 Text</Text>
                  <Text size="4">Size 4 Text</Text>
                  <Text size="3">Size 3 Text</Text>
                  <Text size="2">Size 2 Text</Text>
                  <Text size="1">Size 1 Text</Text>
               </GridCell>
               <GridCell>
                  <Title>Paragraphs</Title>
                  <Text size="2" color="gray50">
                     <p>Wrap paragraphs of text in the <code>p</code> tag. Paragraphs by default have a margin-bottom of 1em</p>
                  </Text>
               </GridCell>
               <GridCell colspan="3">
                  <p>
                     Offal tilde blog venmo sartorial, crucifix leggings
                     pork belly bitters. Banh mi iPhone cardigan tote bag.
                     Man bun narwhal pickled shoreditch kogi bespoke.
                     Vegan photo booth ethical, trust fund asymmetrical
                     neutra DIY banjo craft beer chia humblebrag church-key
                     hammock. Retro actually cold-pressed next level tofu vegan.
                     Shabby chic kogi mumblecore williamsburg. Mlkshk kale
                     chips venmo, synth pabst vegan lomo waistcoat whatever.
                  </p>

                  <p>
                     Narwhal selvage mixtape humblebrag messenger bag.
                     Meditation hella thundercats kitsch intelligentsia yr.
                     Umami ennui pug mlkshk you probably havent heard of
                     them, butcher gochujang four dollar toast kickstarter
                     single-origin coffee pabst brooklyn meditation waistcoat
                     kinfolk. Hashtag four dollar toast street art wolf
                     lumbersexual, cornhole bespoke farm-to-table 3 wolf
                     moon scenester slow-carb pop-up pitchfork.
                     Taxidermy pabst offal affogato, biodiesel echo park narwhal.
                     Master cleanse food truck artisan hammock, quinoa ugh
                     keffiyeh truffaut chia. Messenger bag knausgaard
                     lomo yuccie roof party.
                  </p>

                  <p>
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
                  </p>
               </GridCell>
               <GridCell>
                  <Title>Text Configurations</Title>
                  <Text size="2" color="gray50">
                     Props for using the <code>Text</code> component
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
                           <td><b>color</b></td>
                           <td>IN PROGRESS</td>
                           <td>-</td>
                           <td>
                              Will be able to pass hex, rgba, or preset classes
                           </td>
                        </tr>
                        <tr>
                           <td><b>size</b></td>
                           <td>String</td>
                           <td><code>3</code></td>
                           <td>
                              -
                           </td>
                        </tr>
                        <tr>
                           <td><b>uppercase</b></td>
                           <td>Boolean</td>
                           <td><code>false</code></td>
                           <td>
                              Set to <code>true</code> to enable uppercase on text
                           </td>
                        </tr>
                        <tr>
                           <td><b>weight</b></td>
                           <td>String</td>
                           <td><code>normal</code></td>
                           <td>
                              <code>light</code>
                              <code>normal</code>
                              <code>semibold</code>
                              <code>bold</code>
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
