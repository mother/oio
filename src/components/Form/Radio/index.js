import React, { Component } from 'react'
import Icon from '../../Icon'
import Text from '../../Text'
import View from '../../View'
import style from './style.less'

export default class Radio extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      onChange: React.PropTypes.func,
      value: React.PropTypes.string
   }

   static contextTypes = {
      OIOFormRadio: React.PropTypes.object,
      OIOStyles: React.PropTypes.object
   }

   constructor(props) {
      super(props)

      this.handleChange = this.handleChange.bind(this)

      this.state = {
         checked: false
      }
   }

   componentWillReceiveProps(nextProps) {
      this.setState({
         checked: nextProps.value === this.context.OIOFormRadio.getValue()
      })
   }

   handleChange(event) {
      if (!this.state.checked) this.setState({ checked: true })

      if (this.props.onChange) {
         this.props.onChange(event, event.target.value)
      }
   }

   render() {
      const name = this.context.OIOFormRadio.name

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
