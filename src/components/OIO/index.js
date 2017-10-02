import React, { Component } from 'react'
import classNames from 'classnames'
import defaults from './defaults'
import style from './style.less'

// TODO: Deprecate fontFamily and primaryColor props
export default class OIO extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      fontFamily: React.PropTypes.string,
      fontSizes: React.PropTypes.object,
      primaryColor: React.PropTypes.string
   }

   static defaultProps = {
      fontFamily: 'Helvetica Neue, Arial',
      primaryColor: '#78909C',
      ...defaults
   }

   static childContextTypes = {
      OIOStyles: React.PropTypes.object
   }

   getChildContext() {
      const OIOStyles = {
         fontFamily: this.props.fontFamily,
         fontSizes: this.props.fontSizes,
         primaryColor: this.props.primaryColor
      }

      return { OIOStyles }
   }

   render() {
      const OIOStyles = {}

      if (this.props.fontFamily) {
         OIOStyles.fontFamily = this.props.fontFamily
      }

      return (
         <div
            className={classNames(style.OIO, this.props.className)}
            style={OIOStyles}>
            {this.props.children}
         </div>
      )
   }
}
