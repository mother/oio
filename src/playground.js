import React from 'react'
import ReactDOM from 'react-dom'
import {
   Grid,
   GridCell,
   View
} from './'

import styles from './foundation/styles.less' // eslint-disable-line no-unused-vars

class Demo extends React.Component {
   render() {
      return (
         <View format="auto">
            <Grid gutter="60" columns="4" width="100%">
               <GridCell>
                  Offal tilde blog venmo sartorial, crucifix leggings pork belly bitters. Banh mi iPhone cardigan tote bag. Man bun narwhal pickled shoreditch kogi bespoke. Vegan photo booth ethical, trust fund asymmetrical neutra DIY banjo craft beer chia humblebrag church-key hammock. Retro actually cold-pressed next level tofu vegan. Shabby chic kogi mumblecore williamsburg. Mlkshk kale chips venmo, synth pabst vegan lomo waistcoat whatever.
               </GridCell>
               <GridCell>
                  Offal tilde blog venmo sartorial, crucifix leggings pork belly bitters. Banh mi iPhone cardigan tote bag. Man bun narwhal pickled shoreditch kogi bespoke. Vegan photo booth ethical, trust fund asymmetrical neutra DIY banjo craft beer chia humblebrag church-key hammock. Retro actually cold-pressed next level tofu vegan. Shabby chic kogi mumblecore williamsburg. Mlkshk kale chips venmo, synth pabst vegan lomo waistcoat whatever.
               </GridCell>
               <GridCell>
                  Offal tilde blog venmo sartorial, crucifix leggings pork belly bitters. Banh mi iPhone cardigan tote bag. Man bun narwhal pickled shoreditch kogi bespoke. Vegan photo booth ethical, trust fund asymmetrical neutra DIY banjo craft beer chia humblebrag church-key hammock. Retro actually cold-pressed next level tofu vegan. Shabby chic kogi mumblecore williamsburg. Mlkshk kale chips venmo, synth pabst vegan lomo waistcoat whatever.
               </GridCell>
               <GridCell>
                  Offal tilde blog venmo sartorial, crucifix leggings pork belly bitters. Banh mi iPhone cardigan tote bag. Man bun narwhal pickled shoreditch kogi bespoke. Vegan photo booth ethical, trust fund asymmetrical neutra DIY banjo craft beer chia humblebrag church-key hammock. Retro actually cold-pressed next level tofu vegan. Shabby chic kogi mumblecore williamsburg. Mlkshk kale chips venmo, synth pabst vegan lomo waistcoat whatever.
               </GridCell>
            </Grid>
         </View>
      )
   }
}

ReactDOM.render(<Demo />, document.getElementById('container'))
