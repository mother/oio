import React, { Component } from 'react'
import {
   Grid,
   GridCell,
   Spacer,
   Text,
   Title
} from '../../src'

export default class DemoContentTypography extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   render() {
      return (
         <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
            <GridCell>
               <Title>Typography</Title>
            </GridCell>
            <GridCell colspan="3">
               <Text size="10">This is some text</Text>
               <Text size="9">This is some text</Text>
               <Text size="8">This is some text</Text>
               <Text size="7">This is some text</Text>
               <Text size="6">This is some text</Text>
               <Text size="5">This is some text</Text>
               <Text size="4">This is some text</Text>
               <Text size="3">This is some text</Text>
               <Text size="2">This is some text</Text>
               <Text size="1">This is some text</Text>

               <Spacer size="9" />

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
         </Grid>
      )
   }
}
