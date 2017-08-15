import React, { Component } from 'react'
import classNames from 'classnames'
import { getWindowSize } from '../../utils/size'
import defaults from './defaults'
import style from './style.less'

// TODO: Deprecate fontFamily and primaryColor props
export default class OIO extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      fontFamily: React.PropTypes.string,
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

   constructor(props) {
      super(props)

      this.state = { windowSize: '' }
   }

   getChildContext() {
      const OIOStyles = {
         fontFamily: this.props.fontFamily,
         primaryColor: this.props.primaryColor,
         windowSize: this.state.windowSize
      }

      return { OIOStyles }
   }

   componentWillMount() {
      window.addEventListener('resize', this.windowSizeUpdated, false)
      this.windowSizeUpdated()
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.windowSizeUpdated)
   }

   windowSizeUpdated = () => {
      const windowSize = getWindowSize()
      this.setState({ windowSize })
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
