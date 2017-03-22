import React, { Component } from 'react'
import Icon from '../../Icon'
import Text from '../../Text'
import View from '../../View'
import style from './style.less'

export default class Checkbox extends Component {
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

      this.state = {
         checked: props.checked
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.checked !== this.state.checked) {
         this.setState({ checked: nextProps.checked })
      }
   }

   handleChange = (event) => {
      this.setState({ checked: event.target.checked })

      if (this.props.onChange) {
         const value = event.target.checked
            ? event.target.value
            : undefined

         this.props.onChange(event, value)
      }
   }

   render() {
      const primaryColor = this.context.OIOStyles.primaryColor
      let checkboxIcon = 'ion-ios-circle-outline'
      let checkboxIconStyle = {}

      if (this.state.checked) {
         checkboxIcon = 'ion-ios-checkmark'
         checkboxIconStyle = {
            color: primaryColor
         }
      }

      return (
         <View width="100%">
            <label className={style.checkboxLabel} htmlFor={this.props.id}>
               <input
                  type="checkbox"
                  id={this.props.id}
                  checked={this.state.checked}
                  name={this.props.name}
                  value={this.props.value}
                  onChange={this.handleChange}
                  onBlur={this.props.onBlur}
               />
               <Icon name={checkboxIcon} className={style.icon} style={checkboxIconStyle} />
               <Text size="3" weight="normal">
                  {this.props.label}
               </Text>
               {this.props.children}
            </label>
         </View>
      )
   }
}
