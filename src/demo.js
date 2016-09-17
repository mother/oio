import React from 'react'
import ReactDOM from 'react-dom'
import {
   UIActionBar, UIAvatar, UIButton, UIButtonGroup, UICollectionCard
} from './'

import styles from './components/styles.less' // eslint-disable-line no-unused-vars

class Demo extends React.Component {
   render() {
      return (
         <div>
            <div className="title">
               <span>UIActionBar</span>
            </div>
            <UIActionBar>
               <div>action bar content here</div>
            </UIActionBar>

            <div className="title">UIAvatar</div>
            <UIAvatar src="http://placekitten.com/g/500/500" style={{ width: '100px', height: '100px' }} />

            <div className="title">UIButton</div>
            <UIButton name="Click me!" />

            <div className="title">UIButtonGroup</div>
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

            <div className="title">UICollectionCard</div>
            <UICollectionCard>
               <div>This is a cool card, hover me!</div>
            </UICollectionCard>

            <div className="title">UICover</div>

            <div className="title">UIGrid</div>

            <div className="title">UIIcon</div>

            <div className="title">UINav</div>

            <div className="title">UISpacer</div>

            <div className="title">UITitleBar</div>

            <div className="title">UIToolBar</div>

            <div className="title">UIView</div>
         </div>
      )
   }
}

ReactDOM.render(<Demo />, document.getElementById('container'))
