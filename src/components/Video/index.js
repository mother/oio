import React, { Component } from 'react'
import { getWindowSize } from '../../utils/sizeUtils'

export default class Video extends Component {
   static propTypes = {
      className: React.PropTypes.string,
      src: React.PropTypes.string
   }

   constructor(props, context) {
      super(props, context)

      this.state = {
         size: this.getWindowSize()
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
      const style = {
         float: 'left',
         position: 'relative',
         width: '100%',
         height: '100%',
         overflow: 'hidden'
      }

      return (
         <div className={this.props.className} style={style}>
            <video autoPlay="true">
               Your browser does not support the video tag. I suggest you upgrade your browser.
               <source src={`${this.props.src}.webm`} type="video/webm" />
               <source src={`${this.props.src}.ogv`} type="video/ogv" />
               <source src={`${this.props.src}.mp4`} type="video/mp4" />
            </video>
         </div>
      )
   }
}
