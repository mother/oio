import React from 'react'
import style from './style.less'

export default class OIO extends React.Component {
   static propTypes = {
      children: React.PropTypes.node
   }

   render() {

      return (
         <div className={style.OIO}>
            {this.props.children}
         </div>
      )
   }
}
