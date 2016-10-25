import React from 'react'
import classNames from 'classnames'
import style from './style.less'

export default class OIO extends React.Component {
   static propTypes = {
      children: React.PropTypes.node,
      fontFamily: React.PropTypes.string
   }

   static childContextTypes = {
      OIOStyles: React.PropTypes.object
   }

   getChildContext() {
      const OIOStyles = {
         fontFamily: this.props.fontFamily
      }

      return { OIOStyles }
   }

   render() {
      const OIOStyles = {}

      if (this.props.fontFamily) {
         OIOStyles.fontFamily = this.props.fontFamily
      }

      return (
         <div className={classNames(style.OIO)} style={OIOStyles}>
            {this.props.children}
         </div>
      )
   }
}
