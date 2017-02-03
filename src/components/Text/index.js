import React, { Component } from 'react'
import classNames from 'classnames'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Textarea from '../Form/Textarea'
import style from './style.less'
import colors from '../../foundation/colors.less'

export default class Text extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      color: React.PropTypes.string,
      editable: React.PropTypes.bool,
      editableBody: React.PropTypes.string,
      editing: React.PropTypes.bool,
      onEditCancel: React.PropTypes.func,
      onEditDone: React.PropTypes.func,
      showEditButton: React.PropTypes.bool,
      size: React.PropTypes.string,
      uppercase: React.PropTypes.bool,
      weight: React.PropTypes.string
   }

   static defaultProps = {
      weight: 'normal'
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
   }

   constructor(props) {
      super(props)

      this.handleChange = this.handleChange.bind(this)
      this.handleEditCancel = this.handleEditCancel.bind(this)
      this.handleEditClick = this.handleEditClick.bind(this)
      this.handleEditDone = this.handleEditDone.bind(this)

      this.state = {
         editableBody: props.editableBody,
         editableBodyInitial: props.editableBody
         // editing: props.editing
      }
   }

   componentWillReceiveProps(nextProps) {
      this.setState({ editing: nextProps.editing })
   }

   componentDidUpdate() {
      if (this.editor) {
         const textarea = this.editor.parentNode.getElementsByTagName('textarea')[0]
         this.adjustTextareaHeight(textarea)
      }
   }

   adjustTextareaHeight(textarea) {
      if (textarea) {
         textarea.style.height = 'auto'
         textarea.style.height = `${textarea.scrollHeight + 5}px`
      }
   }

   handleChange(event) {
      this.adjustTextareaHeight(event.target)
      let value = event.target.value
      value = value.replace(/\n/g, '')
      this.setState({ editableBody: value })
   }

   handleEditCancel() {
      if (this.props.onEditCancel) {
         this.props.onEditCancel(this.state.editableBodyInitial, this.state.editableBody)
      }

      // this.setState({
      //    editableBody: this.state.editableBodyInitial,
      //    editing: false
      // })
   }

   handleEditClick(event) {
      this.setState({
         editableBody: this.state.editableBody
         // editing: true
      })
   }

   handleEditDone() {
      if (this.props.onEditDone) {
         this.props.onEditDone(this.state.editableBodyInitial, this.state.editableBody)
      }

      // this.setState({
      //    editableBody: this.state.editableBodyInitial,
      //    editing: false
      // })
   }

   render() {
      const fontSize = this.props.size ? `textSize${this.props.size}` : 'textSize3'
      const textStyle = {}

      const classes = [
         style.editContainer,
         style[fontSize],
         style[this.props.weight],
         colors[this.props.color],
         this.props.className
      ]

      if (this.props.uppercase) {
         classes.push(style.uppercase)
      }

      const showEditButton = (
         !this.props.children &&
         !this.props.editing &&
         this.props.editable &&
         this.props.showEditButton
      )

      return (
         <div className={classNames(classes)} style={textStyle}>
            {showEditButton && (
               <Button
                  onClick={this.handleEditClick}
                  className={style.editButton}
                  icon="ion-edit"
                  size="tiny"
               />
            )}
            {!this.props.children && !this.props.editing && (
               <span>{this.state.editableBody}</span>
            )}
            {!this.props.editable && this.props.children}
            {this.props.editing && this.props.editable && (
               <div ref={(editor) => { this.editor = editor }}>
                  <Textarea
                     className={style.editTextarea}
                     onChange={this.handleChange}
                     value={this.state.editableBody}
                     placeholder="Add text..."
                  />
                  <ButtonGroup align="right">
                     <Button
                        onClick={this.handleEditCancel}
                        name="Cancel"
                        size="tiny"
                        color="#CCC"
                     />
                     <Button
                        onClick={this.handleEditDone}
                        name="Done"
                        size="tiny"
                     />
                  </ButtonGroup>
               </div>
            )}
         </div>
      )
   }
}
