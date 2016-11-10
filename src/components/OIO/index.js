import React from 'react'
import classNames from 'classnames'
import style from './style.less'

export default class OIO extends React.Component {
   static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      fontFamily: React.PropTypes.string,
      secondaryFontFamily: React.PropTypes.string,
      titleFontFamily: React.PropTypes.string
   }

   static childContextTypes = {
      OIOStyles: React.PropTypes.object
   }

   getChildContext() {
      const OIOStyles = {
         fontFamily: this.props.fontFamily,
         secondaryFontFamily: this.props.secondaryFontFamily,
         titleFontFamily: this.props.titleFontFamily
      }

      return { OIOStyles }
   }

   render() {
      const OIOStyles = {}

      if (this.props.fontFamily) {
         OIOStyles.fontFamily = this.props.fontFamily
      }

      return (
         <div className={classNames(style.OIO, this.props.className)} style={OIOStyles}>
            {this.props.children}
         </div>
      )
   }
}
