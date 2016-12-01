import React, { Component } from 'react'
import ReactFiles from 'react-files'

import formStyles from '../styles.less'

export default class Files extends Component {
   static propTypes = {
      accepts: React.PropTypes.array,
      label: React.PropTypes.string,
      multiple: React.PropTypes.bool,
      maxFileSize: React.PropTypes.number
   }

   constructor(props, context) {
      super(props, context)

      this.state = {
         files: []
      }
   }

   componentWillReceiveProps(props) {
      // code
   }

   handleChange(files) {
      this.setState({ files }, () => {
         console.log(files)
         // this.props.onChange(event, this.state.value)
      })
   }

   handleError(error, file) {
      console.log(error)
   }

   render() {
      return (
         <div>
            {this.props.label && <label htmlFor="files">{this.props.label}</label>}
            <ReactFiles
               className={formStyles.files}
               onChange={files => this.handleChange(files)}
               onError={(error, file) => this.handleError(error, file)}
               accepts={this.props.accepts}
               multiple={this.props.multiple}
               maxFileSize={this.props.maxFileSize}
               dropActiveClassName={formStyles.filesActive}>
               <div className={formStyles.filesText}>
                  Drop an image here or click to upload
               </div>
            </ReactFiles>
         </div>
      )
   }
}
