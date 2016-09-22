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
   ActionBar, Button, ButtonGroup, Grid, GridCell, Cover, Nav,
   Spacer, Text, Title, TitleBar, ToolBar, View
} from 'oio'

// Global Styles (ensure webpack css-loader is enabled)
import oio from 'oio/dist/styles.css'

var Demo = React.createClass({
  render: function() {
    return (
      <View scroll="on">
            <div className="p60">
               <Grid gutter="42" width="100%[a-c] 1100px[d-e]">
                  <GridCell colspan="12" className="p12 plrn">
                     <Text heading="1" size="9" weight="light">
                        Making the web more beautiful, fast, and open through great typography
                     </Text>
                     <Spacer size="4" />
                     <Text size="6" weight="light">
                        We believe the best way to bring personality and performance to websites
                        and products is through great design and technology. Our goal is to make
                        that process simple, by offering an intuitive and robust directory of open
                        source designer web fonts. By using our extensive catalog, you can share
                        and integrate typography into any design project seamlessly—no matter where
                        you are in the world.
                     </Text>
                  </GridCell>
                  <GridCell colspan="12[a-b] 8[c-e]">
                     <Text size="3" weight="bold">Discover Great Typography</Text>
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
                  </GridCell>

                  <GridCell colspan="12[a-b] 4[c-e]">
                     <Text size="3" weight="bold">Join our community</Text>
                     We are working with designers around the world to produce
                     best-in-class typeface designs that are made for the web,
                     and because we are open source, this means that we can
                     release early access trials to our community for testing and feedback.
                  </GridCell>

                  <GridCell colspan="12">
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
                  </GridCell>
               </Grid>
            </div>
         </View>
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
