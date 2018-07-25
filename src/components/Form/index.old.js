/* eslint-disable */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Blob from 'blob'
import FormData from 'form-data'

const FormContext = React.createContext('oioForm')

export const withFormContext = WrappedComponent => props => (
   <FormContext.Consumer>
      {context => <WrappedComponent {...props} oioFormContext={context} />}
   </FormContext.Consumer>
)

export { default as createOIOFormField } from './createField'
export { FormContext }

const predefinedRules = {
   required: {
      test: value => !!value,
      message: 'Required'
   },
   email: {
      test: value => (
         new RegExp('^[a-zA-Z0-9.!#$%&amp;’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$')
         .test(value)
      ),
      message: 'Must be a valid email.'
   }
}

const compareFieldValues = (v1, v2) => {
   if (typeof v1 === 'object' || typeof v2 === 'object') {
      return JSON.stringify(v1) === JSON.stringify(v2)
   }

   return v1 === v2
}

export default class Form extends Component {
   static propTypes = {
      children: PropTypes.node,
      onError: PropTypes.func,
      onSubmit: PropTypes.func
   }

   // static childContextTypes = {
   //    OIOForm: PropTypes.object
   // }

   constructor(props) {
      super(props)

      this.testContext = {
         get: this.get
      }

      this.state = {
         data: {},
         errors: {},
         pristine: true,
         submitting: false
      }
   }

   // getChildContext() {
   //    const OIOForm = {
   //       getErrors: this.getErrors,
   //       setInitialValue: this.setInitialValue,
   //       setRules: this.setRules,
   //       setValue: this.setValue,
   //       validateValue: this.validateValue,
   //       pristine: this.state.pristine,
   //       submitting: this.state.submitting
   //    }
   //
   //    return { OIOForm }
   // }

   // TODO: Note that this is not very efficient since renders do
   // not need to occur when updating values. In fact, we shouldn't
   // be using state at all to store much of this information, and
   // we only do to ensure context updates properly, which is a hack.
   // We should not rely on context changes to propagate automatically.
   shouldComponentUpdate(nextProps, nextState) {
      return true
   }

   // =======================================================
   // OIO Form Field Utils (propagated by context)
   // =======================================================

   setInitialValue = (name, value) => {
      if (!name) return

      this.setState((state) => {
         const data = {
            ...state.data,
            [name]: {
               ...state.data[name],
               initialValue: value,
               value
            }
         }

         return {
            data,
            pristine: Object.keys(data).every(n => (
               compareFieldValues(data[n].value, data[n].initialValue)
            ))
         }
      })
   }

   setValue = (name, value, callback = () => {}) => {
      if (!name) return

      this.setState((state) => {
         const data = {
            ...state.data,
            [name]: {
               ...state.data[name],
               value
            }
         }

         return {
            data,
            pristine: Object.keys(data).every(n => (
               compareFieldValues(data[n].value, data[n].initialValue)
            ))
         }
      }, callback)
   }

   setRules = (name, rules) => {
      this.setState(state => ({
         ...state,
         data: {
            ...state.data,
            [name]: {
               ...state.data[name],
               rules
            }
         }
      }))
   }

   getErrors = () => {
      const errors = {}
      let exist = false

      Object.keys(this.state.data).forEach((key) => {
         errors[key] = this.state.data[key].error
         if (errors[key]) exist = true
      })

      return { errors, exist }
   }

   validateValue = (name, value, rules) => {
      const validationResult = this.applyRulesToValue(rules, value)

      if (name) {
         this.setState((state, props) => ({
            ...state,
            data: {
               ...state.data,
               [name]: {
                  ...state.data[name],
                  error: validationResult
               }
            }
         }))
      }

      return validationResult
   }

   // =======================================================
   // Validation Test Util
   // =======================================================

   get = (key) => {
      try {
         return this.state.data[key].value
      } catch (e) {
         return undefined
      }
   }

   // =======================================================
   // Helpers
   // =======================================================

   applyRulesToValue(rules = [], value) {
      for (const rule of rules) {
         let test
         let message

         if (typeof rule === 'string') {
            const ruleDefinition = predefinedRules[rule]
            if (ruleDefinition) {
               test = ruleDefinition.test
               message = ruleDefinition.message
            }
         } else if (typeof rule === 'object' && typeof rule.test === 'string') {
            const ruleDefinition = predefinedRules[rule.test]
            if (ruleDefinition) {
               test = ruleDefinition.test
               message = rule.message || ruleDefinition.message
            }
         } else if (typeof rule === 'object' &&
            typeof rule.test === 'function' &&
            typeof rule.message === 'string') {
            test = rule.test
            message = rule.message
         }

         if (test && !test.call(this.testContext, value, this.testContext)) {
            return message
         }
      }

      return null
   }

   // =======================================================
   // Form Submission Utils
   // =======================================================

   constructFormData = (data, files) => {
      const formData = new FormData()

      Object.keys(data).forEach(key => formData.append(key, data[key]))
      Object.keys(files).forEach((key) => {
         const file = files[key]
         formData.append(key, new Blob([file], { type: file.type }), file.name || 'file')
      })

      return formData
   }

   reinitializeFormState = () => {
      this.setState((state) => {
         const fieldNames = Object.keys(state.data)
         const newData = Object.assign({}, fieldNames.reduce((newState, key) => {
            newState[key] = {
               ...state.data[key],
               initialValue: state.data[key].value
            }

            return newState
         }, {}))

         return {
            data: newData,
            pristine: true,
            submitting: false
         }
      })
   }

   handleSubmit = (event) => {
      event.preventDefault()

      const errors = this.getErrors()
      if (errors.exist) {
         if (this.props.onError) {
            this.props.onError(errors.errors)
         }

         return
      }

      const data = {}
      const files = {}

      Object.keys(this.state.data).forEach((fieldName) => {
         const value = this.state.data[fieldName].value
         if (value instanceof window.File) {
            files[fieldName] = value
         } else {
            data[fieldName] = value
         }
      })

      if (this.props.onSubmit) {
         const formData = this.constructFormData(data, files)
         const submitPromise = this.props.onSubmit(data, files, formData, {
            constructFormData: this.constructFormData,
            reinitializeFormState: this.reinitializeFormState
         })

         // We check if the reference to the form element is
         // defined before attempting to modify this component's state,
         // since the component may be unmounted by the time submitPromise
         // is fulfilled/rejected
         if (submitPromise instanceof Promise) {
            this.setState({ submitting: true }, () => {
               submitPromise
               .then(() => {
                  if (this.formElement) {
                     this.reinitializeFormState()
                  }
               })
               .catch(() => {
                  if (this.formElement) {
                     this.setState({ submitting: false })
                  }
               })
            })
         }
      }
   }

   // =======================================================
   // Render
   // =======================================================

   render() {
      return (
         <form
            onSubmit={this.handleSubmit}
            ref={(ref) => { this.formElement = ref }}>
            <FormContext.provider value={{
               getErrors: this.getErrors,
               setInitialValue: this.setInitialValue,
               setRules: this.setRules,
               setValue: this.setValue,
               validateValue: this.validateValue,
               pristine: this.state.pristine,
               submitting: this.state.submitting
            }}>
               {this.props.children}
            </FormContext.provider>
         </form>
      )
   }
}
