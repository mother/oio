/* eslint-disable react/require-default-props */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withFormContext } from '..'
import formStyles from '../styles.less'

class Switch extends Component {
   static propTypes = {
      error: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      oioFormContext: PropTypes.object.isRequired,
      readOnly: PropTypes.bool,
      onChange: PropTypes.func,
      value: PropTypes.bool
   }

   static contextTypes = {
      OIOStyles: PropTypes.object
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.initialValue !== undefined && nextProps.value !== undefined) {
         throw new Error('Form elements must be either controlled or uncontrolled '
            + '(specify either the initialValue or value prop, but not both).')
      }

      const controlled = typeof nextProps.value !== 'undefined'
      if (controlled) {
         nextProps.oioFormContext.setValue(nextProps.name, nextProps.value)
         return { controlled }
      }

      if (typeof nextProps.initialValue !== 'undefined') {
         if (nextProps.initialValue !== prevState.initialValue) {
            nextProps.oioFormContext.setInitialValue(nextProps.name, nextProps.initialValue)
            return {
               controlled,
               initialValue: nextProps.initialValue,
               value: nextProps.initialValue
            }
         }
      // Default
      } else if (typeof prevState.value === 'undefined') {
         nextProps.oioFormContext.setInitialValue(nextProps.name, false)
         return {
            controlled,
            initialValue: false,
            value: false
         }
      }

      return { controlled }
   }

   state = {
      controlled: false
   }

   handleChange = (event) => {
      const currentValue = this.state.controlled ? this.props.value : this.state.value
      const newValue = !currentValue

      if (!this.state.controlled) {
         this.props.oioFormContext.setValue(this.props.name, newValue)
         this.setState({ value: newValue })
      }

      if (this.props.onChange) {
         this.props.onChange(event, newValue)
      }
   }

   render() {
      const checked = this.state.controlled ? this.props.value : this.state.value
      const primaryColor = this.context.OIOStyles.primaryColor
      const switchStyle = {}

      if (checked) {
         switchStyle.backgroundColor = primaryColor
      }

      return (
         <span className={formStyles.container} name={this.props.name}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <label className={formStyles.switch} htmlFor={this.props.id}>
               <input
                  id={this.props.id}
                  checked={checked}
                  type="checkbox"
                  name={this.props.name}
                  onChange={this.props.readOnly ? undefined : this.handleChange}
                  readOnly={this.props.readOnly}
               />
               <div className={formStyles.switchSlider} style={switchStyle} />
            </label>
            {this.props.error && (
               <div className={formStyles.error}>
                  {this.props.error}
               </div>
            )}
         </span>
      )
   }
}

export default withFormContext(Switch)
