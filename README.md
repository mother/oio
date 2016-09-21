oio
=======================

> A UI component kit for React

# - *UNDER CONSTRUCTION* -

## Demo

[https://mother.github.io/oio](https://mother.github.io/oio)

## Installation

Install from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

```bash
npm install oio --save
```

## Usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import {
   UIActionBar, UIButton, UIButtonGroup, UIGrid, UIGridCell, UICover, UINav,
   UISpacer, UIText, UITitle, UITitleBar, UIToolBar, UIView
} from 'oio'

// Global Styles (ensure webpack css-loader is enabled)
import oio from 'oio/dist/styles.css'

var Demo = React.createClass({
  render: function() {
    return (
      <UIView scroll="on">
            <div className="p60">
               <UIGrid gutter="42" width="100%[a-c] 1100px[d-e]">
                  <UIGridCell colspan="12" className="p12 plrn">
                     <UIText heading="1" size="9" weight="light">
                        Making the web more beautiful, fast, and open through great typography
                     </UIText>
                     <UISpacer size="4" />
                     <UIText size="6" weight="light">
                        We believe the best way to bring personality and performance to websites
                        and products is through great design and technology. Our goal is to make
                        that process simple, by offering an intuitive and robust directory of open
                        source designer web fonts. By using our extensive catalog, you can share
                        and integrate typography into any design project seamlessly—no matter where
                        you are in the world.
                     </UIText>
                  </UIGridCell>
                  <UIGridCell colspan="12[a-b] 8[c-e]">
                     <UIText size="3" weight="bold">Discover Great Typography</UIText>
                     Our font directory places typography front and center, inviting users to
                     explore, sort, and test fonts for use in more than 135 languages. We showcase
                     individual type designers and foundries, giving you valuable information about
                     the people and their processes, as well as analytics on usage and demographics.
                     Our series of thematic collections helps you discover new fonts that have been
                     vetted and organized by our team of designers, engineers, and collaborators,
                     and our default sort organizes fonts based on popularity, trends, and your
                     geographic location. You can also create your own highly customized collections
                     by filtering families, weights, and scripts, plus test color themes, and review
                     sample copy. Collections can be shared, making it easy to collaborate on
                     projects and ensure typography is optimized and streamlined throughout the
                     design and engineering process.
                     <br /><br /><br /><br /><br />
                  </UIGridCell>

                  <UIGridCell colspan="12[a-b] 4[c-e]">
                     <UIText size="3" weight="bold">Join our community</UIText>
                     We are working with designers around the world to produce
                     best-in-class typeface designs that are made for the web,
                     and because we are open source, this means that we can
                     release early access trials to our community for testing and feedback.
                  </UIGridCell>

                  <UIGridCell colspan="12">
                     <UIText size="10">This is some text</UIText>
                     <UIText size="9">This is some text</UIText>
                     <UIText size="8">This is some text</UIText>
                     <UIText size="7">This is some text</UIText>
                     <UIText size="6">This is some text</UIText>
                     <UIText size="5">This is some text</UIText>
                     <UIText size="4">This is some text</UIText>
                     <UIText size="3">This is some text</UIText>
                     <UIText size="2">This is some text</UIText>
                     <UIText size="1">This is some text</UIText>
                  </UIGridCell>

                  <UIGridCell colspan="6">
                     <div className={styles.uiDocsExampleContainer}>
                        <UITitleBar title="Example" />
                        <UIActionBar>
                           <UINav type="tabs">
                              <a href="" className="active">Tab 1</a>
                              <a href="">Tab 2</a>
                              <a href="">Tab 3</a>
                           </UINav>
                        </UIActionBar>
                        <UIView width="100%" format="float" className="p30">
                           <UIText size="5">Title 1</UIText>
                           <UIText>I am a subtitle</UIText>

                           <UISpacer size="4" />
                           <table className="uiTable">
                              <thead>
                                 <tr>
                                    <th>Cell 1</th>
                                    <th>Cell 2</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td>Cell 1</td>
                                    <td>Cell 2</td>
                                 </tr>
                                 <tr>
                                    <td>Cell 1</td>
                                    <td>Cell 2</td>
                                 </tr>
                                 <tr>
                                    <td>Cell 1</td>
                                    <td>Cell 2</td>
                                 </tr>
                                 <tr>
                                    <td>Cell 1</td>
                                    <td>Cell 2</td>
                                 </tr>
                              </tbody>
                           </table>
                        </UIView>
                        <UIToolBar>
                           <UIButtonGroup align="right">
                              <UIButton name="Previous" />
                              <UIButton name="Next" />
                           </UIButtonGroup>
                        </UIToolBar>
                     </div>
                  </UIGridCell>
                  <UIGridCell colspan="6">
                     <div className={styles.uiDocsExampleContainer}>
                        <UITitleBar title="Form Example" />
                        <UIView width="100%" format="float" className="p30">
                           <h2>Customer Information</h2>
                           <UIText>I am a subtitle</UIText>
                           <UISpacer size="4" />

                           <form>
                              <UIGrid>
                                 <UIGridCell colspan="12">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="text" />
                                 </UIGridCell>
                                 <UIGridCell colspan="6">
                                    <label htmlFor="firstName">First Name</label>
                                    <input id="firstName" type="text" />
                                 </UIGridCell>
                                 <UIGridCell colspan="6">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input id="lastName" type="text" />
                                 </UIGridCell>
                                 <UIGridCell colspan="12">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" />

                                    <label htmlFor="city">City</label>
                                    <input type="text" />
                                 </UIGridCell>
                                 <UIGridCell colspan="6">
                                    <label htmlFor="country">Country</label>
                                    <select name="" id="">
                                       <option value="">Canada</option>
                                    </select>
                                 </UIGridCell>
                                 <UIGridCell colspan="6">
                                    <label htmlFor="state">State/Province</label>
                                    <select name="" id="">
                                       <option value="">Alberta</option>
                                    </select>
                                 </UIGridCell>
                              </UIGrid>
                           </form>
                        </UIView>
                        <UIToolBar>
                           <UIButton className="right" name="Save Changes" />
                        </UIToolBar>
                     </div>
                  </UIGridCell>
                  <UIGridCell colspan="6">
                     <div className={styles.uiDocsExampleContainer}>
                        <UIView
                           width="100%"
                           aspectRatio="4:3[a-b] 16:9[c-e]"
                           className="bgBlack"
                           format="float">
                           <UICover src="/assets/images/test1.jpg" />
                        </UIView>
                        <div className="c100 p30">
                           <UITitle heading="2" size="6">Customer Information</UITitle>
                           <UIText>I am a subtitle</UIText>
                        </div>
                     </div>
                  </UIGridCell>
                  <UIGridCell colspan="6">
                     <div className={styles.uiDocsExampleContainer}>
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
                              Umami ennui pug mlkshk you probably have not heard of
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
                     </div>
                  </UIGridCell>
               </UIGrid>
            </div>
         </UIView>
    )
  }
})

ReactDOM.render(<Demo />, document.getElementById('container'))
```

## Tinker

```
git clone https://github.com/mother/oio
npm install
```
And since React is just a peer dependency:
```
npm install react
npm install react-dom
```
Then:
```
npm run dev
```
Then visit [http://localhost:8000](http://localhost:8000)

### Build

```
npm run build
```

## Props



### Test (TODO)

```
npm test
```

### License

MIT. Copyright (c) 2016 Mother Co.
