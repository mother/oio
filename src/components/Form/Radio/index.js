/* eslint-disable react/require-default-props */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Icon from '../../Icon'
import Text from '../../Text'
import View from '../../View'
import { withRadioGroupContext } from '../RadioGroup'
import { withFormContext } from '..'
import style from './style.less'

class Radio extends Component {
   static propTypes = {
      checked: PropTypes.bool,
      children: PropTypes.node,
      id: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      onChange: PropTypes.func,
      oioFormContext: PropTypes.object,
      radioGroupState: PropTypes.object,
      readOnly: PropTypes.bool,
      value: PropTypes.string.isRequired
   }

   static defaultProps = {
      readOnly: false
   }

   // TODO: Deprecate
   static contextTypes = {
      OIOStyles: PropTypes.object
   }

   // TODO: An error should be thrown if onChange, name, readOnly is specified
   // on both RadioGroup and Radio
   static getDerivedStateFromProps(nextProps, prevState) {
      // If using Radio inside RadioGroup, cannot set 'checked' on Radio
      if (typeof nextProps.checked !== 'undefined' && typeof nextProps.radioGroupState !== 'undefined') {
         throw new Error('Input elements must be either controlled or uncontrolled '
            + '("checked" prop cannot be set when using Radio inside RadioGroup).')
      }

      // const name = nextProps.radioGroupState.name || nextProps.name
      const controlled = typeof nextProps.checked !== 'undefined'
      if (controlled) {
         // TODO: Should attempt to set formContext only if there is no group context present
         // if (nextProps.checked) {
         //    nextProps.oioFormContext.setValue(nextProps.name, nextProps.value)
         // }

         return { controlled }
      }

      if (typeof nextProps.radioGroupState !== 'undefined') {
         const checked = nextProps.radioGroupState.value === nextProps.value
         // if (checked) {
         //    nextProps.oioFormContext.setValue(nextProps.name, nextProps.value)
         // }

         return { controlled, checked }
      }

      return { controlled }
   }

   state = {
      controlled: false
   }

   handleChange = (event) => {
      const checked = event.target.checked
      if (!this.state.controlled) {
         this.setState({ checked })

         if (checked) {
            const name = this.props.radioGroupState.name || this.props.name
            if (typeof this.props.radioGroupState !== 'undefined') {
               this.props.radioGroupState.onChange(name, event.target.value)
            } else if (typeof this.props.oioFormContext !== 'undefined') {
               this.props.oioFormContext.setValue(name, event.target.value)
            }
         }
      }

      if (checked && this.props.onChange) {
         this.props.onChange(event, event.target.value)
      }
   }

   render() {
      const name = this.props.radioGroupState.name || this.props.name
      const readOnly = this.props.radioGroupState.readOnly || this.props.readOnly
      const checked = this.state.controlled ? this.props.checked : this.state.checked

      const readOnlyEventHandlers = {}
      if (readOnly) {
         readOnlyEventHandlers.onClick = () => false
         readOnlyEventHandlers.onKeyDown = () => false
      }

      const primaryColor = this.context.OIOStyles.primaryColor
      let radioIcon = 'ion-ios-circle-outline'
      let radioIconStyle = {}

      if (checked) {
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
                  checked={checked}
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

export default withFormContext(withRadioGroupContext(Radio))
