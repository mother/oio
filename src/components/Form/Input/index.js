/* eslint-disable react/require-default-props */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import { withFormContext } from '..'
import styles from './styles.less'
import formStyles from '../styles.less'

class Input extends Component {
   static propTypes = {
      className: PropTypes.string,
      error: PropTypes.string,
      id: PropTypes.string,
      initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      label: PropTypes.string,
      name: PropTypes.string.isRequired,
      oioFormContext: PropTypes.object,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      placeholder: PropTypes.string,
      type: PropTypes.string,
      readOnly: PropTypes.bool,
      value: PropTypes.string
   }

   static get defaultProps() {
      const rand = Math.floor(Math.random() * Math.floor(100))
      return {
         id: `oio-form-component-${Date.now()}-${rand}`,
         type: 'text'
      }
   }

   // TODO: Deprecate
   static contextTypes = {
      OIOStyles: PropTypes.object
   }

   state = {
      controlled: false
   }

   componentDidMount() {
      // console.log('\n\n====================================\n')
      // console.log('componentDidMount', this.props.initialValue, this.props.value)
      if (this.props.initialValue !== undefined && this.props.value !== undefined) {
         throw new Error('Input elements must be either controlled or uncontrolled '
            + '(specify either the initialValue or value prop, but not both).')
      }

      if (this.props.value) {
         this.props.oioFormContext.setValue(this.props.name, this.props.value)
      } else if (typeof this.props.initialValue !== 'undefined') {
         this.props.oioFormContext.setInitialValue(this.props.name, this.props.initialValue)
      // Default
      } else {
         this.props.oioFormContext.setInitialValue(this.props.name, '')
      }
   }

   componentDidUpdate(prevProps, prevState) {
      // console.log('componentDidUpdate', this.props.initialValue, this.props.value)
      if (this.props.initialValue !== undefined && this.props.value !== undefined) {
         throw new Error('Input elements must be either controlled or uncontrolled '
            + '(specify either the initialValue or value prop, but not both).')
      }

      if (typeof this.props.value !== 'undefined') {
         if (prevState.value !== this.props.value) {
            this.props.oioFormContext.setValue(this.props.name, this.props.value)
         }
      } else if (typeof this.props.initialValue !== 'undefined') {
         if (this.props.initialValue !== prevState.initialValue) {
            this.props.oioFormContext.setInitialValue(this.props.name, this.props.initialValue)
         }
      // Default
      } else /* if (typeof prevState.value === 'undefined') */ {
         this.props.oioFormContext.setInitialValue(this.props.name, '')
      }
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const controlled = typeof nextProps.value !== 'undefined'
      if (controlled) {
         return {
            controlled,
            value: nextProps.value
         }
      }

      if (typeof nextProps.initialValue !== 'undefined') {
         if (nextProps.initialValue !== prevState.initialValue) {
            return {
               controlled,
               initialValue: nextProps.initialValue,
               value: nextProps.initialValue
            }
         }
      // Default
      } else if (typeof prevState.value === 'undefined') {
         return {
            controlled,
            initialValue: '',
            value: ''
         }
      }

      return { controlled }
   }

   handleBlur = (event) => {
      // TODO: HANDLE STUPID SAFARI AUTOCOMPLETE SCENARIO
      // console.log('blur', event.target.value)

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
      const classes = [styles.input, this.props.className]
      const inputStyles = {}

      if (this.context.OIOStyles && this.context.OIOStyles.fontFamily) {
         inputStyles.fontFamily = this.context.OIOStyles.fontFamily
      }

      return (
         <div className={formStyles.container}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <input
               id={this.props.id}
               style={inputStyles}
               className={classNames(classes)}
               onBlur={this.handleBlur}
               onChange={this.handleChange}
               name={this.props.name}
               placeholder={this.props.placeholder}
               readOnly={this.props.readOnly}
               type={this.props.type}
               value={this.state.controlled ? this.props.value : this.state.value}
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

export default withFormContext(Input)
