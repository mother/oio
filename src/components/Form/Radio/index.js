import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Icon from '../../Icon'
import Text from '../../Text'
import View from '../../View'
import style from './style.less'

export default class Radio extends Component {
   static propTypes = {
      checked: PropTypes.bool,
      children: PropTypes.node,
      id: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      onChange: PropTypes.func,
      readOnly: PropTypes.bool,
      value: PropTypes.string
   }

   static defaultProps = {
      checked: false,
      readOnly: false
   }

   static contextTypes = {
      OIOFormRadio: PropTypes.object,
      OIOStyles: PropTypes.object
   }

   constructor(props) {
      super(props)

      this.state = {
         checked: props.checked
      }
   }

   componentWillReceiveProps(nextProps) {
      let checked = nextProps.checked
      if (this.context.OIOFormRadio) {
         checked = nextProps.value === this.context.OIOFormRadio.getProps().value
      }

      this.setState({ checked })
   }

   handleChange = (event) => {
      this.setState({ checked: event.target.checked })

      if (this.props.onChange) {
         this.props.onChange(event, event.target.checked)
      }
   }

   render() {
      const name = this.context.OIOFormRadio
         ? this.context.OIOFormRadio.name
         : this.props.name

      const readOnly = this.context.OIOFormRadio
         ? this.context.OIOFormRadio.getProps().readOnly
         : this.props.readOnly

      const readOnlyEventHandlers = {}
      if (readOnly) {
         readOnlyEventHandlers.onClick = () => false
         readOnlyEventHandlers.onKeyDown = () => false
      }

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
                  onChange={!readOnly && this.handleChange}
                  {...readOnlyEventHandlers}
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
