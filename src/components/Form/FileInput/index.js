import React, { Component } from 'react'
import Files from 'react-files'
import formStyles from '../styles.less'

export default class FileInput extends Component {
   static propTypes = {
      accepts: React.PropTypes.array,
      label: React.PropTypes.string,
      maxFileSize: React.PropTypes.number,
      name: React.PropTypes.string,
      onChange: React.PropTypes.func,
      onError: React.PropTypes.func,
      style: React.PropTypes.object
   }

   static contextTypes = {
      OIOForm: React.PropTypes.object
   }

   constructor(props) {
      super(props)

      this.handleChange = this.handleChange.bind(this)

      this.state = {
         file: null,
         src: ''
      }
   }

   componentWillReceiveProps(props) {
      this.setState({ src: props.src })
   }

   handleChange(files) {
      const file = files[0]

      this.setState({ file })

      if (this.context.OIOForm) {
         this.context.OIOForm.setValue(this.props.name, file)
      }

      if (this.props.onChange) {
         this.props.onChange(file)
      }
   }

   render() {
      const dropzone = this.state.file
         ? <div><b>{this.state.file.name}</b> - {this.state.file.sizeReadable}</div>
         : <div>Drop a file or click here to upload.</div>

      return (
         <div>
            {this.props.label && <label htmlFor="files">{this.props.label}</label>}
            <Files
               className={formStyles.files}
               onChange={this.handleChange}
               onError={this.props.onError}
               name={this.props.name}
               multiple={false}
               accepts={this.props.accepts}
               maxFileSize={this.props.maxFileSize}
               dropActiveClassName={formStyles.filesActive}
               style={this.props.style}>
               {dropzone}
            </Files>
         </div>
      )
   }
}
