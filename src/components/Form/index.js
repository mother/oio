import React, { Component } from 'react'
import Blob from 'blob'
import FormData from 'form-data'

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

      this.handleSubmit = this.handleSubmit.bind(this)

      // For consumption by form components via context
      this.hasErrors = false
      this.getErrors = this.getErrors.bind(this)
      // this.hasErrors = this.hasErrors.bind(this)
      this.setDefaultValue = this.setDefaultValue.bind(this)
      this.setRules = this.setRules.bind(this)
      this.setValue = this.setValue.bind(this)
      this.validateValue = this.validateValue.bind(this)

      this.testContext = {
         get: this.get.bind(this)
      }

      this.state = {
         data: {},
         pristine: true,
         submitting: false
      }
   }

   // ===================================================
   // Context Things
   // Allows Form Components to Update Form State
   // ===================================================

   getChildContext() {
      const OIOForm = {
         getErrors: this.getErrors,
         hasErrors: this.hasErrors,
         setDefaultValue: this.setDefaultValue,
         setRules: this.setRules,
         setValue: this.setValue,
         validateValue: this.validateValue,
         pristine: this.state.pristine,
         submitting: this.state.submitting
      }

      return { OIOForm }
   }

   // eslint-disable-next-line react/sort-comp
   setDefaultValue(name, value) {
      if (!name) return

      this.setState(state => ({
         data: {
            ...state.data,
            [name]: {
               ...state.data[name],
               value
            }
         }
      }))
   }

   setRules(name, rules) {
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

   setValue(name, value) {
      if (!name) return

      this.setState(state => ({
         pristine: false,
         data: {
            ...state.data,
            [name]: {
               ...state.data[name],
               value
            }
         }
      }))
   }

   validateValue(name, value, rules) {
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

   // ===================================================
   // Lifecycle
   // ===================================================

   // TODO: We can actually do some optimization here to ensure that
   // re-renders are not triggered by form components called `setValue`,
   // `setDefaultValue`, or `validateValue`
   shouldComponentUpdate(nextProps, nextState) {
      return true
   }

   // ===================================================
   // Stuff
   // ===================================================

   getErrors() {
      const errors = {}
      this.hasErrors = false

      Object.keys(this.state.data).forEach((key) => {
         errors[key] = this.state.data[key].error
         if (errors[key]) this.hasErrors = true
      })

      return errors
   }

   // hasErrors() {
   //    return this.hasErrors
   // }

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

   get(key) {
      try {
         return this.state.data[key].value
      } catch (e) {
         return undefined
      }
   }

   handleSubmit(event) {
      event.preventDefault()

      const errors = {}
      let errorsPresent = false
      const data = {}
      const files = []
      const formData = new FormData()
      for (const key of Object.keys(this.state.data)) {
         const value = this.state.data[key].value
         const rules = this.state.data[key].rules

         if (value instanceof window.File) {
            files.push(value)
            formData.append(key, new Blob([value], { type: value.type }))
         } else {
            errors[key] = this.validateValue(key, value, rules)
            if (errors[key]) errorsPresent = true
            data[key] = value
            formData.append(key, value)
         }
      }

      if (errorsPresent) {
         if (this.props.onError) this.props.onError(errors)
      } else if (this.props.onSubmit) {
         const submitPromise = this.props.onSubmit(data, files, formData)
         if (submitPromise instanceof Promise) {
            this.setState({ submitting: true }, () => {
               submitPromise
               .then(() => this.setState({ pristine: true, submitting: false }))
               .catch(() => this.setState({ submitting: false }))
            })
         }
      }
   }

   render() {
      return (
         <form onSubmit={this.handleSubmit}>
            {this.props.children}
         </form>
      )
   }
}
