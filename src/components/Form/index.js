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
      this.getErrors = this.getErrors.bind(this)
      this.setDefaultValue = this.setDefaultValue.bind(this)
      this.setRules = this.setRules.bind(this)
      this.setValue = this.setValue.bind(this)
      this.validateValue = this.validateValue.bind(this)

      this.testContext = {
         get: this.get.bind(this)
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
         setDefaultValue: this.setDefaultValue,
         setRules: this.setRules,
         setValue: this.setValue,
         validateValue: this.validateValue,
         pristine: this.state.pristine,
         submitting: this.state.submitting
      }

      return { OIOForm }
   }

   // TODO: We can actually do some optimization here to ensure that
   // re-renders are not triggered by form components called `setValue`,
   // `setDefaultValue`, or `validateValue`
   shouldComponentUpdate(nextProps, nextState) {
      return true
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

   getErrors() {
      const errors = {}
      let exist = false

      Object.keys(this.state.data).forEach((key) => {
         errors[key] = this.state.data[key].error
         if (errors[key]) exist = true
      })

      return { errors, exist }
   }

   get(key) {
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

   handleSubmit(event) {
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
               .then(() => this.setState({ pristine: true, submitting: false }))
               .catch(() => this.setState({ submitting: false }))
            })
         }
      }
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

   render() {
      return (
         <form onSubmit={this.handleSubmit}>
            {this.props.children}
         </form>
      )
   }
}
