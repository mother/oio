import React, { Component } from 'react'

import Files from 'react-files'

import formStyles from '../styles.less'

const imagePlaceholder = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMzkuMSAoMzE3MjApIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPmFkZDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJhZGQiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwNi4wMDAwMDAsIDEwNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIHN0cm9rZT0iI0QzRDNEMyIgc3Ryb2tlLXdpZHRoPSI3IiBjeD0iMTUwIiBjeT0iMTUwIiByPSIxNTAiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iI0QzRDNEMyIgeD0iMTQ1Ljg1NjM1NCIgeT0iNzIuMDk5NDQ3NSIgd2lkdGg9IjguMjg3MjkyODIiIGhlaWdodD0iMTU1LjgwMTEwNSIgcng9IjQuMTQzNjQ2NDEiPjwvcmVjdD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9IiNEM0QzRDMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1MC4wMDAwMDAsIDE1MC4wMDAwMDApIHJvdGF0ZSg5MC4wMDAwMDApIHRyYW5zbGF0ZSgtMTUwLjAwMDAwMCwgLTE1MC4wMDAwMDApICIgeD0iMTQ1Ljg1NjM1NCIgeT0iNzIuMDk5NDQ3NSIgd2lkdGg9IjguMjg3MjkyODIiIGhlaWdodD0iMTU1LjgwMTEwNSIgcng9IjQuMTQzNjQ2NDEiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+'

export default class File extends Component {
   static propTypes = {
      accepts: React.PropTypes.array,
      height: React.PropTypes.string,
      label: React.PropTypes.string,
      maxFileSize: React.PropTypes.number,
      name: React.PropTypes.string,
      onChange: React.PropTypes.func,
      style: React.PropTypes.object,
      type: React.PropTypes.string,
      width: React.PropTypes.string
   }

   constructor(props, context) {
      super(props, context)

      this.state = {
         file: null,
         src: ''
      }
   }

   componentWillReceiveProps(props) {
      this.setState({ src: props.src })
   }

   handleChange(files) {
      this.setState({ file: files[0] }, () => {
         this.props.onChange(null, this.state.file)
      })
   }

   render() {
      let dropzone
      if (this.props.type === 'image') {
         dropzone = <img className={formStyles.filesImage} src={imagePlaceholder} alt="placeholder" />
         if (this.state.src) {
            dropzone = <img className={formStyles.filesImage} src={this.state.src} alt="Avatar" />
         }
         if (this.state.file) {
            dropzone = <img className={formStyles.filesImage} src={this.state.file.preview.url} alt="Avatar" />
         }
      } else {
         dropzone = <div>Drop a file or click here to upload.</div>
         if (this.state.file) {
            dropzone = (
               <div>
                  <b>{this.state.file.name}</b> - {this.state.file.sizeReadable}
               </div>
            )
         }
      }

      const style = {}
      if (this.props.height) style.height = this.props.height
      if (this.props.width) style.width = this.props.width

      return (
         <div>
            {this.props.label && <label htmlFor="files">{this.props.label}</label>}
            <Files
               className={
                  this.props.type === 'image'
                     ? formStyles.filesImageContainer
                     : formStyles.files
               }
               onChange={files => this.handleChange(files)}
               onError={(error, file) => this.handleError(error, file)}
               name={this.props.name}
               multiple={false}
               accepts={
                  !this.props.accepts && this.props.type === 'image'
                     ? ['image/png', 'image/jpeg']
                     : this.props.accepts
               }
               maxFileSize={this.props.maxFileSize}
               dropActiveClassName={formStyles.filesActive}
               style={this.props.style}>
               {dropzone}
            </Files>
         </div>
      )
   }
}
