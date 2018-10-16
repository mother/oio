/* eslint-disable react/require-default-props */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import { withFormContext } from '..'
import styles from './styles.less'
import formStyles from '../styles.less'

class Textarea extends Component {
   static propTypes = {
      className: PropTypes.string,
      disabled: PropTypes.bool,
      error: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string,
      oioFormContext: PropTypes.object.isRequired,
      onBlur: PropTypes.func,
      placeholder: PropTypes.string,
      readOnly: PropTypes.bool,
      required: PropTypes.bool,
      rows: PropTypes.string,
      onChange: PropTypes.func,
      value: PropTypes.string
   }

   static defaultProps = {
      required: false,
      disabled: false,
      rows: '5'
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
         nextProps.oioFormContext.setInitialValue(nextProps.name, '')
         return {
            controlled,
            initialValue: '',
            value: ''
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
      const classes = [styles.textarea, this.props.className, this.props.error && styles.error]

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
            <textarea
               className={classNames(classes)}
               disabled={this.props.disabled}
               id={this.props.id}
               onBlur={this.handleBlur}
               onChange={this.handleChange}
               name={this.props.name}
               placeholder={this.props.placeholder}
               value={this.state.controlled ? this.props.value : this.state.value}
               readOnly={this.props.readOnly}
               rows={this.props.rows}
            />
            {this.props.error && (
               <div className={formStyles.error}>
                  {this.props.error}
               </div>
            )}
         </div>
      )
   }
}

export default withFormContext(Textarea)
