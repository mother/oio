import React, { Component } from 'react'
import View from '../View'
import { getWindowSize } from '../../utils/sizeUtils'

export default class Video extends Component {
   static propTypes = {
      autoPlay: React.PropTypes.bool,
      className: React.PropTypes.string,
      height: React.PropTypes.string,
      src: React.PropTypes.string,
      width: React.PropTypes.string
   }

   static defaultProps = {
      autoPlay: true,
      height: '100%',
      width: '100%'
   }

   constructor(props, context) {
      super(props, context)

      this.state = {
         size: getWindowSize()
      }

      this.windowSizeUpdated = this.windowSizeUpdated.bind(this)
   }

   componentDidMount() {
      this.setVideoContainer()
      window.addEventListener('resize', this.windowSizeUpdated, false)
   }

   componentDidUpdate() {
      this.setVideoContainer()
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.windowSizeUpdated)
   }

   setVideoContainer() {

   }

   windowSizeUpdated() {
      const windowSize = getWindowSize()
      this.setState({ size: windowSize })
   }

   render() {
      // Common/Important Props picked out so we can set defaults
      const { autoPlay, className, width, height, src, ...videoProps } = this.props
      const style = { overflow: 'hidden' }

      return (
         <View width={width} height={height} className={className} style={style}>
            <video autoPlay={autoPlay} height="100%" {...videoProps}>
               Your browser does not support the video tag. Please upgrade your browser.
               <source src={`${src}.webm`} type="video/webm" />
               <source src={`${src}.ogv`} type="video/ogv" />
               <source src={`${src}.mp4`} type="video/mp4" />
            </video>
         </View>
      )
   }
}
