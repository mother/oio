import React, { Component } from 'react'
import Blob from 'blob'
import FormData from 'form-data'

export { default as createOIOFormField } from './createField'

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
      children: React.PropTypes.node,
      onError: React.PropTypes.func,
      onSubmit: React.PropTypes.func
   }

   static childContextTypes = {
      OIOForm: React.PropTypes.object
   }

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

   getChildContext() {
      const OIOForm = {
         getErrors: this.getErrors,
         setInitialValue: this.setInitialValue,
         setRules: this.setRules,
         setValue: this.setValue,
         validateValue: this.validateValue,
         pristine: this.state.pristine,
         submitting: this.state.submitting
      }

      return { OIOForm }
   }

   // TODO: Note that this is not very efficient since renders do
   // not need to occur when updating values. In fact, we shouldn't
   // be using state at all to store much of this information, and
   // we only do to ensure context updates properly, which is a hack.
   // We should not rely on context changes to propagate automatically.
   shouldComponentUpdate(nextProps, nextState) {
      return true
   }

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

   get = (key) => {
      try {
         return this.state.data[key].value
      } catch (e) {
         return undefined
      }
   }

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

   constructFormData(data) {
      const formData = new FormData()

      for (const key of Object.keys(data)) {
         const value = data[key]
         if (value instanceof window.File) {
            formData.append(key, new Blob([value], { type: value.type }))
         } else {
            formData.append(key, value)
         }
      }

      return formData
   }

   handleSubmit = (event) => {
      event.preventDefault()

      const errors = {}
      let errorsExist = false
      const data = {}
      const files = []

      for (const key of Object.keys(this.state.data)) {
         const value = this.state.data[key].value
         const rules = this.state.data[key].rules
         errors[key] = this.validateValue(key, value, rules)
         if (errors[key]) errorsExist = true
         data[key] = value
         if (value instanceof window.File) files.push(value)
      }

      const formData = this.constructFormData(data)

      if (errorsExist) {
         if (this.props.onError) this.props.onError(errors)
      } else if (this.props.onSubmit) {
         const submitPromise = this.props.onSubmit(data, files, formData, this.constructFormData)
         if (submitPromise instanceof Promise) {
            this.setState({ submitting: true }, () => {
               submitPromise
               .then(() => {
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
               })
               .catch(() => this.setState({ submitting: false }))
            })
         }
      }
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

   render() {
      return (
         <form onSubmit={this.handleSubmit}>
            {this.props.children}
         </form>
      )
   }
}
