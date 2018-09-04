/* eslint-disable react/require-default-props */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withFormContext } from '..'
import formStyles from '../styles.less'

const CheckboxGroupContext = React.createContext()

export const withCheckboxGroupContext = WrappedComponent => props => (
   <CheckboxGroupContext.Consumer>
      {context => <WrappedComponent {...props} checkboxGroupState={context} />}
   </CheckboxGroupContext.Consumer>
)

export { CheckboxGroupContext }

class CheckboxGroup extends Component {
   static propTypes = {
      children: PropTypes.node,
      error: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      oioFormContext: PropTypes.object,
      readOnly: PropTypes.bool,
      onChange: PropTypes.func,
      initialValue: PropTypes.array,
      value: PropTypes.array
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
         if (nextProps.initialValue.join(',') !== prevState.initialValue.join(',')) {
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

   state = {
      controlled: false,
      initialValue: [],
      value: []
   }

   handleChange = (event, value) => {
      const checked = event.target.checked
      const checkboxValue = event.target.value
      const groupValue = [...this.state.value]
      if (checked) {
         if (!groupValue.includes(checkboxValue)) {
            groupValue.push(checkboxValue)
         }
      } else {
         const index = groupValue.indexOf(checkboxValue)
         if (index > -1) {
            groupValue.splice(index, 1)
         }
      }

      if (!this.state.controlled) {
         this.props.oioFormContext.setValue(this.props.name, groupValue)
         this.setState({ value: groupValue })
      }

      if (this.props.onChange) {
         this.props.onChange(event, groupValue)
      }
   }

   render() {
      return (
         <div className={formStyles.container} name={this.props.name}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <div>
               <CheckboxGroupContext.Provider value={{
                  onChange: this.handleChange,
                  name: this.props.name,
                  readOnly: this.props.readOnly,
                  value: this.state.controlled ? this.props.value : this.state.value
               }}>
                  {this.props.children}
               </CheckboxGroupContext.Provider>
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

export default withFormContext(CheckboxGroup)
