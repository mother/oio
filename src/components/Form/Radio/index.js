import React, { Component } from 'react'
import Icon from '../../Icon'
import Text from '../../Text'
import View from '../../View'
import style from './style.less'

export default class Radio extends Component {
   static propTypes = {
      checked: React.PropTypes.bool,
      children: React.PropTypes.node,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      value: React.PropTypes.string
   }

   static defaultProps = {
      checked: false
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
   }

   constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
   }

   handleChange(event) {
      if (this.props.onChange) {
         const value = event.target.checked
            ? event.target.value
            : undefined

         this.props.onChange(event, value)
      }
   }

   render() {
      const primaryColor = this.context.OIOStyles.primaryColor
      let radioIcon = 'ion-ios-circle-outline'
      let radioIconStyle = {}

      if (this.props.checked) {
         radioIcon = 'ion-ios-circle-filled'
         radioIconStyle = {
            color: primaryColor
         }
      }

      return (
         <View width="100%">
            <label className={style.radioLabel} htmlFor={this.props.id}>
               <input
                  id={this.props.id}
                  checked={this.props.checked}
                  type="radio"
                  name={this.props.name}
                  value={this.props.value}
                  onChange={this.handleChange}
                  onBlur={this.props.onBlur}
               />
               <Icon name={radioIcon} className={style.icon} style={radioIconStyle} />
               <Text size="3" weight="normal">
                  {this.props.label}
               </Text>
               {this.props.children}
            </label>
         </View>
      )
   }
}
