/* eslint-disable react/require-default-props */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import { withFormContext } from '..'
import styles from './styles.less'
import formStyles from '../styles.less'

class Select extends Component {
   static propTypes = {
      className: PropTypes.string,
      error: PropTypes.string,
      id: PropTypes.string,
      initialValue: PropTypes.string,
      label: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string.isRequired,
      oioFormContext: PropTypes.object.isRequired,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      options: PropTypes.array,
      readOnly: PropTypes.bool,
      required: PropTypes.bool,
      value: PropTypes.string
   }

   static defaultProps = {
      options: [],
      required: false
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.initialValue !== undefined && nextProps.value !== undefined) {
         throw new Error('Input elements must be either controlled or uncontrolled '
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
         if (Array.isArray(nextProps.options) && nextProps.options.length) {
            nextProps.oioFormContext.setInitialValue(nextProps.name, nextProps.options[0].value)
            return {
               controlled,
               initialValue: nextProps.options[0].value,
               value: nextProps.options[0].value
            }
         }
      }

      return { controlled }
   }

   state = {
      controlled: false
   }

   handleBlur = (event) => {
      if (this.props.onBlur) {
         this.props.onBlur(event)
      }
   }

   handleChange = (event) => {
      if (!this.state.controlled) {
         this.props.oioFormContext.setValue(this.props.name, event.target.value)
         this.setState({ value: event.target.value })
      }

      if (this.props.onChange) {
         this.props.onChange(event, event.target.value)
      }
   }

   render() {
      const classes = [styles.select, this.props.className, this.props.error && styles.error]
      const options = this.props.options.map(option => (
         <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}>
            {option.text}
         </option>
      ))

      return (
         <div className={formStyles.container}>
            <div className={formStyles.lab}>
               {this.props.label && (
                  <label htmlFor={this.props.id}>
                     {this.props.label}
                     {this.props.required && <div style={{ color: 'red', display: 'inline' }}> *</div>}
                  </label>
               )}
               {this.props.description && (
                  <div
                     className={formStyles.description}>
                     {this.props.description}
                  </div>
               )}
            </div>
            <select
               className={classNames(classes)}
               id={this.props.id}
               value={this.state.controlled ? this.props.value : this.state.value}
               name={this.props.name}
               onChange={this.handleChange}
               readOnly={this.props.readOnly}>
               {options}
            </select>
            {this.props.error && (
               <div className={formStyles.error}>
                  {this.props.error}
               </div>
            )}
         </div>
      )
   }
}

export default withFormContext(Select)
