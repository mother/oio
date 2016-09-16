react-kit
=======================

> A UI component kit for React

# - *UNDER CONSTRUCTION* -

## Demo

[https://mother.github.io/react-kit](https://mother.github.io/react-kit)

## Installation

Install from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

```bash
npm install react-kit --save
```

## Usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Kit from 'react-kit'

var Demo = React.createClass({
  render: function() {
    return (
      <div>Hello</div>
    )
  }
})

ReactDOM.render(<Demo />, document.getElementById('container'))
```

## Tinker

```
git clone https://github.com/mother/react-kit
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
