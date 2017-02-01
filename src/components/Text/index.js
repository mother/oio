import React, { Component } from 'react'
import classNames from 'classnames'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Textarea from '../Form/Textarea'
import style from './style.less'
import colors from '../../foundation/colors.less'

export default class Text extends Component {
   static propTypes = {
      body: React.PropTypes.string,
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      color: React.PropTypes.string,
      editable: React.PropTypes.bool,
      onEditCancel: React.PropTypes.func,
      onEditDone: React.PropTypes.func,
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
         body: this.props.body,
         bodyBeforeEdit: this.props.body,
         editing: false
      }
   }

   handleChange(event) {
      this.setState({ body: event.target.value })
   }

   handleEditCancel() {
      this.props.onEditCancel(this.state.body)
      this.setState({
         body: this.state.bodyBeforeEdit,
         editing: false
      })
   }

   handleEditClick(event) {
      this.setState({
         body: this.state.body,
         editing: true
      })
   }

   handleEditDone() {
      this.props.onEditDone(this.state.body)
      this.setState({
         body: this.state.body,
         bodyBeforeEdit: this.state.body,
         editing: false
      })
   }

   render() {
      const fontSize = this.props.size ? `textSize${this.props.size}` : 'textSize3'
      const textStyle = {}

      const classes = [
         style[fontSize],
         style[this.props.weight],
         colors[this.props.color],
         this.props.className
      ]

      if (this.props.uppercase) {
         classes.push(style.uppercase)
      }

      return (
         <div className={classNames(classes)} style={textStyle}>
            {!this.props.children && !this.state.editing && this.props.editable && (
               <Button
                  onClick={this.handleEditClick}
                  className={style.editable}
                  icon="ion-edit"
                  size="tiny"
               />
            )}
            {!this.props.children && !this.state.editing && this.props.body && (
               <span>{this.state.body}</span>
            )}
            {!this.props.editable && this.props.children}
            {this.state.editing && this.props.editable && (
               <div>
                  <Textarea
                     onChange={this.handleChange}
                     value={this.state.body}
                  />
                  <ButtonGroup align="right">
                     <Button onClick={this.handleEditCancel} name="Cancel" size="tiny" />
                     <Button onClick={this.handleEditDone} name="Done" size="tiny" />
                  </ButtonGroup>
               </div>
            )}
         </div>
      )
   }
}
