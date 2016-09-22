import React from 'react'
import ReactDOM from 'react-dom'
import {
   UIActionBar,
   UIAvatar,
   UIButton,
   UIButtonGroup,
   UICollectionCard,
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
   something() {
      console.log('wow')
   }

   render() {
      const spacerSize = '5'
      const titleHeading = '1'
      const titleSize = '7'

      return (
         <div>
            <UITitle heading={titleHeading} size="10">Mother UI</UITitle>

            <UISpacer size={spacerSize} />
            <UITitle heading={titleHeading} size={titleSize}>UIActionBar</UITitle>
            <UIActionBar>
               <div>action bar content here</div>
            </UIActionBar>

            <UISpacer size={spacerSize} />
            <UITitle heading={titleHeading} size={titleSize}>UIAvatar</UITitle>
            <UIAvatar src="http://placekitten.com/g/500/500" style={{ width: '100px', height: '100px' }} />

            <UISpacer size={spacerSize} />
            <UITitle heading={titleHeading} size={titleSize}>UIButton</UITitle>
            <UIButton name="Click me!" onClick={this.something} />

            <UISpacer size={spacerSize} />
            <UITitle heading={titleHeading} size={titleSize}>UIButtonGroup</UITitle>
            <div
               style={{
                  backgroundColor: '#000',
                  height: '60px'
               }}>
               <UIButtonGroup align="left">
                  <UIButton name="1" rounded outline />
                  <UIButton name="2" rounded outline />
                  <UIButton name="3" rounded outline />
                  <UIButton name="Click me!" rounded outline />
               </UIButtonGroup>
            </div>

            <UISpacer size={spacerSize} />
            <UITitle heading={titleHeading} size={titleSize}>UICollectionCard</UITitle>
            <UICollectionCard
               type="announcement"
               title="Title"
               body="Users will have access to Global Pay per View
               and Live Streaming and will be able to converse with
               the world’s top historians and Living Legends."
               onClick={this.something}
            />

            <UISpacer size={spacerSize} />
            <UITitle heading={titleHeading} size={titleSize}>UICover</UITitle>
            <UICover src="http://placekitten.com/g/1000/500">
               <div
                  style={{
                     height: '300px'
                  }}>this is the cover content!</div>
            </UICover>

            <UISpacer size={spacerSize} />
            <UITitle heading={titleHeading} size={titleSize}>UIGrid + UIGridCell</UITitle>
            <div>
               <UIGrid columns="1[a] 2[b] 4[c] 5[d] 6[e]" gutter="6">
                  <UIGridCell>
                     <UICollectionCard title="Initiative 1" />
                  </UIGridCell>
                  <UIGridCell>
                     <UICollectionCard title="Initiative 2" />
                  </UIGridCell>
               </UIGrid>
            </div>

            <UISpacer size={spacerSize} />
            <UITitle heading={titleHeading} size={titleSize}>UIIcon</UITitle>

            <UISpacer size={spacerSize} />
            <UITitle heading={titleHeading} size={titleSize}>UINav</UITitle>
            <UIActionBar>
               <UINav type="tabs">
                  <a href="" className="active">Tab 1</a>
                  <a href="">Tab 2</a>
                  <a href="">Tab 3</a>
               </UINav>
            </UIActionBar>

            <UISpacer size={spacerSize} />
            <UITitle heading={titleHeading} size={titleSize}>UIText</UITitle>
            <UIText>I am a subtitle</UIText>

            <UISpacer size={spacerSize} />
            <UITitle heading={titleHeading} size={titleSize}>UITitleBar</UITitle>
            <UITitleBar title="Example" />

            <UISpacer size={spacerSize} />
            <UITitle heading={titleHeading} size={titleSize}>UIToolBar</UITitle>
            <UIToolBar>
               <UIButtonGroup align="right">
                  <UIButton name="Previous" />
                  <UIButton name="Next" />
               </UIButtonGroup>
            </UIToolBar>

            <UISpacer size={spacerSize} />
            <UITitle heading={titleHeading} size={titleSize}>UIView</UITitle>
            <UIView
               width="100%"
               height="100px[a] 200px[b] 300px[c] 400px[d] 500px[e]"
               scroll="on[a-b]"
               format="float[a-c]">
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

            <UISpacer size={spacerSize} />
         </div>
      )
   }
}

ReactDOM.render(<Demo />, document.getElementById('container'))
