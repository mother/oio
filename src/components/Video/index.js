import React, { Component } from 'react'

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

   getAttributeForCurrentSize(attributeValue) {
      const currentSize = this.state.size
      const fragments = attributeValue.split(' ')

      for (const fragment of fragments) {
         const charSet = fragment.match(/\[([abcdef,-]+)\]/i)
         if (Array.isArray(charSet) && charSet.length === 2) {
            const charRegexp = new RegExp(`[${charSet[1]}]`, 'i')
            const match = currentSize.match(charRegexp)
            if (Array.isArray(match)) {
               return fragment.replace(charSet[0], '')
            }
         } else {
            return fragment
         }
      }

      return null
   }

   getWindowSize() {
      const windowWidth = document.documentElement.clientWidth

      if (windowWidth >= 1650) {
         return 'e'
      } else if (windowWidth >= 1300) {
         return 'd'
      } else if (windowWidth >= 992) {
         return 'c'
      } else if (windowWidth >= 768) {
         return 'b'
      } else if (windowWidth >= 0) {
         return 'a'
      }

      return null
   }

   setVideoContainer() {

   }

   windowSizeUpdated() {
      const windowSize = this.getWindowSize()
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
            <video>
               Your browser does not support the video tag. I suggest you upgrade your browser.
               <source src={`${this.props.src}.webm`} type="video/webm" />
               <source src={`${this.props.src}.ogv`} type="video/ogv" />
               <source src={`${this.props.src}.mp4`} type="video/mp4" />
            </video>
         </div>
      )
   }
}
