import React, { Component } from 'react'
import Icon from '../../Icon'
import Text from '../../Text'
import View from '../../View'
import style from './style.less'

export default class Radio extends Component {
   static propTypes = {
      // checked: React.PropTypes.bool,
      children: React.PropTypes.node,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      onChange: React.PropTypes.func,
      value: React.PropTypes.string
   }

   // static defaultProps = {
   //    checked: false
   // }

   static contextTypes = {
      OIOForm: React.PropTypes.object,
      OIOFormRadioGroup: React.PropTypes.object,
      OIOStyles: React.PropTypes.object
   }

   constructor(props) {
      super(props)

      this.handleChange = this.handleChange.bind(this)

      this.state = {
         checked: false
      }
   }

   handleChange(event) {
      const value = this.state.checked ? '' : event.target.value

      this.setState({
         checked: !this.state.checked,
         value
      })

      const name = this.context.OIOFormRadioGroup.name
      this.context.OIOForm.setValue(name, value)

      if (this.props.onChange) {
         this.props.onChange(event, value)
      }
   }

   render() {
      const name = this.context.OIOFormRadioGroup.name

      const primaryColor = this.context.OIOStyles.primaryColor
      let radioIcon = 'ion-ios-circle-outline'
      let radioIconStyle = {}

      if (this.state.checked) {
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
                  checked={this.state.checked}
                  type="radio"
                  name={name}
                  value={this.props.value}
                  onChange={this.handleChange}
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
