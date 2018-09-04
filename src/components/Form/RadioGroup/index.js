/* eslint-disable react/require-default-props */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withFormContext } from '..'
import formStyles from '../styles.less'

const RadioGroupContext = React.createContext()

export const withRadioGroupContext = WrappedComponent => props => (
   <RadioGroupContext.Consumer>
      {context => <WrappedComponent {...props} radioGroupState={context} />}
   </RadioGroupContext.Consumer>
)

export { RadioGroupContext }

class RadioGroup extends Component {
   static propTypes = {
      children: PropTypes.node,
      error: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string.isRequired,
      oioFormContext: PropTypes.object,
      readOnly: PropTypes.bool,
      onChange: PropTypes.func,
      value: PropTypes.string
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
      }

      return { controlled }
   }

   state = { controlled: false }

   handleChange = (event, value) => {
      if (!this.state.controlled) {
         this.props.oioFormContext.setValue(this.props.name, value)
         this.setState({ value })
      }

      if (this.props.onChange) {
         this.props.onChange(event, value)
      }
   }

   render() {
      return (
         <div className={formStyles.container} name={this.props.name}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <div>
               <RadioGroupContext.Provider value={{
                  onChange: this.handleChange,
                  name: this.props.name,
                  readOnly: this.props.readOnly,
                  value: this.state.controlled ? this.props.value : this.state.value
               }}>
                  {this.props.children}
               </RadioGroupContext.Provider>
            </div>
            {this.props.error && (
               <div className={formStyles.error}>
                  {this.props.error}
               </div>
            )}
         </div>
      )
   }
}

export default withFormContext(RadioGroup)
