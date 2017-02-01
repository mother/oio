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
      this.handleEditClick = this.handleEditClick.bind(this)

      this.state = {
         body: this.props.body,
         editing: false
      }
   }

   handleChange(event) {
      this.setState({ body: event.target.value })
   }

   handleEditClick(event) {
      this.setState({
         body: this.state.body,
         editing: true
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
               <span>{this.props.body}</span>
            )}
            {!this.props.editable && this.props.children}
            {this.state.editing && this.props.editable && (
               <div>
                  <Textarea
                     onChange={this.handleChange}
                     value={this.state.body}
                  />
                  <ButtonGroup align="right">
                     <Button onClick={this.props.onEditCancel} name="Cancel" />
                     <Button onClick={this.props.onEditDone} name="Done" />
                  </ButtonGroup>
               </div>
            )}
         </div>
      )
   }
}
