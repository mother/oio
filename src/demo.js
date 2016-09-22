import React from 'react'
import ReactDOM from 'react-dom'
import {
   UIActionBar,
   UIAvatar,
   UIButton,
   UIButtonGroup,
   UICover,
   UIGrid,
   UIGridCell,
   // UIIcon,
   UINav,
   UISpacer,
   UIText,
   UITitle,
   UITitleBar,
   UIToolBar,
   UIView
} from './'

import styles from './foundation/styles.less' // eslint-disable-line no-unused-vars

class Demo extends React.Component {
   render() {
      const titleHeading = '1'
      const titleSize = '4'

      return (
         <UIView>
            <UIView width="20%" height="100%" format="float">
               <UITitle heading={titleHeading} weight="light" size="9">OIO</UITitle>
               <UIText weight="bold" color="gray40">A Happy Style Framework</UIText>
               <UISpacer size="4" />
               <UINav type="directory">
                  <a href="">Example</a>
                  <a href="">Actionbar</a>
                  <a href="">Avatar</a>
                  <a href="">Button</a>
                  <a href="">Button Group</a>
                  <a href="">Grid</a>
                  <a href="">GridCell</a>
                  <a href="">Icon</a>
                  <a href="">Spacer</a>
                  <a href="">Text</a>
                  <a href="">Title</a>
                  <a href="">Titlebar</a>
                  <a href="">Toolbar</a>
                  <a href="">View</a>
               </UINav>
            </UIView>
            <UIView width="80%" height="100%" format="float">
               <UITitleBar title="Example" />
               <UIActionBar>
                  <UINav type="tabs">
                     <a href="" className="active">Tab 1</a>
                     <a href="">Tab 2</a>
                     <a href="">Tab 3</a>
                  </UINav>
               </UIActionBar>
               <UIView width="100%" height="75%" format="float" scroll="on">
                  <UIGrid columns="1[a] 2[b] 4[c] 4[d] 4[e]" gutter="6">
                     <UIGridCell colspan="4">
                        <UICover src="http://placekitten.com/g/1000/500" position="top center">
                           <div
                              style={{
                                 height: '480px'
                              }}>this is the cover content!</div>
                        </UICover>
                     </UIGridCell>
                     <UIGridCell>
                        Grid Cell 1
                     </UIGridCell>
                     <UIGridCell>
                        Grid Cell 2
                     </UIGridCell>
                     <UIGridCell>
                        <UITitle heading={titleHeading} size={titleSize}>UIAvatar</UITitle>
                        <UIAvatar src="http://placekitten.com/g/500/500" style={{ width: '100px', height: '100px' }} />
                     </UIGridCell>
                  </UIGrid>

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
                     Umami ennui pug mlkshk you probably haven't heard of
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
               </UIView>
               <UIToolBar>
                  <UIButtonGroup align="right">
                     <UIButton name="Previous" />
                     <UIButton name="Next" />
                  </UIButtonGroup>
               </UIToolBar>
            </UIView>
         </UIView>
      )
   }
}

ReactDOM.render(<Demo />, document.getElementById('container'))
