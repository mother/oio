import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import defaults from './defaults'
import style from './style.less'

// TODO: Deprecate fontFamily and primaryColor props
export default class OIO extends Component {
   static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      fontFamily: PropTypes.string,
      fontSizes: PropTypes.object,
      primaryColor: PropTypes.string
   }

   static defaultProps = {
      fontFamily: 'Helvetica Neue, Arial',
      primaryColor: '#78909C',
      ...defaults
   }

   static childContextTypes = {
      OIOStyles: PropTypes.object
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
         OIOStyles.fontSize = defaults.base.fontSize
      }

      return (
         <div
            id="oio-container"
            className={classNames(style.OIO, this.props.className)}
            style={OIOStyles}>
            {this.props.children}
         </div>
      )
   }
}
