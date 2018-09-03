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
      oioFormContext: PropTypes.object.isRequired,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      placeholder: PropTypes.string,
      type: PropTypes.string,
      readOnly: PropTypes.bool,
      value: PropTypes.string
   }

   static defaultProps = {
      type: 'text'
   }

   // TODO: Deprecate
   static contextTypes = {
      OIOStyles: PropTypes.object
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.initialValue !== undefined && nextProps.value !== undefined) {
         throw new Error('Input elements must be either controlled or uncontrolled ' +
            '(specify either the initialValue or value prop, but not both).')
      }

      const initialValueDefined = typeof nextProps.initialValue !== 'undefined'
      if (initialValueDefined && nextProps.initialValue !== prevState.initialValue) {
         nextProps.oioFormContext.setInitialValue(nextProps.name, nextProps.initialValue)
         return {
            controlled: false,
            initialValue: nextProps.initialValue,
            value: nextProps.initialValue
         }
      } else if (typeof nextProps.value !== 'undefined' && prevState.controlled) {
         nextProps.oioFormContext.setValue(nextProps.name, nextProps.value)
         return { value: nextProps.value }
      }

      return null
   }

   constructor(props) {
      super(props)

      const controlled = typeof props.value !== 'undefined'
      this.state = {
         controlled,
         value: controlled
            ? props.value
            : (props.initialValue || '')
      }
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
            {this.props.error &&
               <div className={formStyles.error}>
                  {this.props.error}
               </div>
            }
         </div>
      )
   }
}

export default withFormContext(Input)
