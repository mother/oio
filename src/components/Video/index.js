import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import View from '../View'
import { getWindowSize } from '../../utils/size'

export default class Video extends Component {
   static propTypes = {
      autoPlay: PropTypes.bool,
      className: PropTypes.string,
      height: PropTypes.string,
      src: PropTypes.string,
      width: PropTypes.string
   }

   static defaultProps = {
      autoPlay: true,
      height: '100%',
      width: '100%'
   }

   constructor(props) {
      super(props)

      this.state = {
         size: getWindowSize(),
         videoLeft: '0px',
         videoTop: '0px',
         videoWidth: 'auto',
         videoHeight: 'auto'
      }
   }

   componentDidMount() {
      this.videoNode.addEventListener('loadedmetadata', event =>
         this.setVideoPositionAndSize()
      )
      window.addEventListener('resize', this.windowSizeUpdated, false)
   }

   componentDidUpdate() {
      this.setVideoPositionAndSize()
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.windowSizeUpdated)
   }

   setVideoPositionAndSize() {
      const containerNode = this.containerNode
      const videoNode = this.videoNode

      const containerWidth = containerNode.offsetWidth
      const containerHeight = containerNode.offsetHeight
      const containerAspectRatio = containerWidth / containerHeight

      const videoWidth = videoNode.videoWidth
      const videoHeight = videoNode.videoHeight
      const videoAspectRatio = videoWidth / videoHeight

      if (containerAspectRatio >= videoAspectRatio) {
         if (videoNode.offsetWidth !== containerWidth) {
            this.setState({
               videoTop: (containerHeight / 2) - (containerWidth / videoAspectRatio / 2),
               videoLeft: '0px',
               videoHeight: 'auto',
               videoWidth: containerWidth
            })
         }
      } else if (videoNode.offsetHeight !== containerHeight) {
         this.setState({
            videoTop: '0px',
            videoLeft: (containerWidth / 2) - ((containerHeight * videoAspectRatio) / 2),
            videoHeight: containerHeight,
            videoWidth: 'auto'
         })
      }
   }

   windowSizeUpdated = () => {
      const windowSize = getWindowSize()
      this.setState({ size: windowSize })
   }

   render() {
      // Common/Specific/Important props set for specific reasons
      const { autoPlay, className, width, height, src, ...videoProps } = this.props
      const viewStyle = {
         overflow: 'hidden'
      }
      const containerStyle = {
         position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0
      }
      const videoStyle = {
         position: 'absolute',
         top: this.state.videoTop,
         left: this.state.videoLeft,
         height: this.state.videoHeight,
         width: this.state.videoWidth
      }

      return (
         <View
            width={width}
            height={height}
            className={classNames(className, 'bgBlack')}
            style={viewStyle}>
            <div
               ref={containerNode => (this.containerNode = containerNode)}
               style={containerStyle}>
               <video
                  ref={videoNode => (this.videoNode = videoNode)}
                  autoPlay={autoPlay}
                  style={videoStyle}
                  {...videoProps}>
                  Your browser does not support the video tag. Please upgrade your browser.
                  <source src={`${src}.webm`} type="video/webm" />
                  <source src={`${src}.ogv`} type="video/ogv" />
                  <source src={`${src}.mp4`} type="video/mp4" />
               </video>
            </div>
         </View>
      )
   }
}
