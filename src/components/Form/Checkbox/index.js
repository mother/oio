/* eslint-disable react/require-default-props */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Icon from '../../Icon'
import Text from '../../Text'
import View from '../../View'
import { withCheckboxGroupContext } from '../CheckboxGroup'
import { withFormContext } from '..'
import style from './style.less'

class Checkbox extends Component {
   static propTypes = {
      checked: PropTypes.bool,
      children: PropTypes.node,
      id: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      onChange: PropTypes.func,
      oioFormContext: PropTypes.object,
      checkboxGroupState: PropTypes.object,
      readOnly: PropTypes.bool,
      value: PropTypes.string
   }

   static defaultProps = {
      readOnly: false
   }

   // TODO: DEPRECATE
   static contextTypes = {
      OIOStyles: PropTypes.object
   }

   // TODO: An error should be thrown if onChange, name, readOnly is specified
   // on both RadioGroup and Radio
   static getDerivedStateFromProps(nextProps, prevState) {
      // If using Radio inside RadioGroup, cannot set 'checked' on Radio
      if (typeof nextProps.checked !== 'undefined' && typeof nextProps.checkboxGroupState !== 'undefined') {
         throw new Error('Input elements must be either controlled or uncontrolled '
            + '("checked" prop cannot be set when using Checkbox inside CheckboxGroup).')
      }

      // const name = nextProps.checkboxGroupState.name || nextProps.name
      const controlled = typeof nextProps.checked !== 'undefined'
      if (controlled) {
         // TODO: Should attempt to set formContext only if there is no group context present
         // if (nextProps.checked) {
         //    nextProps.oioFormContext.setValue(nextProps.name, nextProps.value)
         // }

         return { controlled }
      }

      if (typeof nextProps.checkboxGroupState !== 'undefined') {
         if (Array.isArray(nextProps.checkboxGroupState.value)) {
            const checked = nextProps.checkboxGroupState.value.includes(nextProps.value)
            // if (checked) {
            //    nextProps.oioFormContext.setValue(nextProps.name, nextProps.value)
            // }

            return { controlled, checked }
         }
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

         // const name = this.props.checkboxGroupState.name || this.props.name
         if (typeof this.props.checkboxGroupState !== 'undefined') {
            this.props.checkboxGroupState.onChange(event, event.target.value)
         }
         // else if (typeof this.props.oioFormContext !== 'undefined') {
         //    this.props.oioFormContext.setValue(name, event.target.value)
         // }
      }

      if (this.props.onChange) {
         this.props.onChange(event, event.target.value)
      }
   }

   render() {
      const name = this.props.checkboxGroupState.name || this.props.name
      const readOnly = this.props.checkboxGroupState.readOnly || this.props.readOnly
      const checked = this.state.controlled ? this.props.checked : this.state.checked

      const readOnlyEventHandlers = {}
      if (readOnly) {
         readOnlyEventHandlers.onClick = () => false
         readOnlyEventHandlers.onKeyDown = () => false
      }

      const primaryColor = this.context.OIOStyles.primaryColor
      let checkboxIcon = 'ion-android-checkbox-outline-blank'
      let checkboxIconStyle = {}

      if (this.state.checked) {
         checkboxIcon = 'ion-android-checkbox'
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
                  checked={checked}
                  name={name}
                  value={this.props.value}
                  onChange={!readOnly && this.handleChange}
                  {...readOnlyEventHandlers}
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

export default withFormContext(withCheckboxGroupContext(Checkbox))
