import React, { Component } from 'react'
// import Blob from 'blob'
// import FormData from 'form-data'

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

      // For consumpotion by form components via context
      this.setDefaultValue = this.setDefaultValue.bind(this)
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
         setDefaultValue: this.setDefaultValue,
         setValue: this.setValue,
         validateValue: this.validateValue,
         errors: this.getErrors(),
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
      console.log('validating value', name, value, validationResult) // eslint-disable-line no-console

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

   componentWillReceiveProps(newProps) {

   }

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
      const errors = []
      Object.keys(this.state.data).forEach((key) => {
         if (this.state.data[key].error) {
            errors.push(this.state.data[key].error)
         }
      })

      return errors
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

   get(key) {
      try {
         return this.state.data[key].value
      } catch (e) {
         return undefined
      }
   }

   handleSubmit(event) {
      event.preventDefault()

      const errors = this.getErrors()
      if (errors.length > 0) {
         if (this.props.onError) return this.props.onError(errors)
      }

      // TODO: Implement files and formData
      // FileInput and ImageInput should pass in Blob or File as values
      // Then we can iterate through this.state.data, checking for
      // values that are instanceof Blob or File
      const data = {}
      for (const key of Object.keys(this.state.data)) {
         data[key] = this.state.data[key].value
      }
      const files = null
      const formData = null

      if (this.props.onSubmit) {
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
