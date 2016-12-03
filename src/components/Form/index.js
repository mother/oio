import React, { Component } from 'react'

import { findNodesinDOM, replaceNodesInDOM } from '../../utils/dom'

const formComponentNames = [
   'CheckboxGroup',
   'Input',
   'RadioGroup',
   'Select',
   'Switch',
   'Textarea'
]

const predefinedRules = {
   required: {
      test: value => !!value,
      message: 'Required'
   },
   email: {
      test: (value) => (
         new RegExp('^[a-zA-Z0-9.!#$%&amp;’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
         .test(value)
      ),
      message: 'Must be a valid email.'
   }
}

export default class Form extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      onError: React.PropTypes.func,
      onSubmit: React.PropTypes.func
   }

   constructor(props) {
      super(props)

      this.testContext = {
         get: this.get.bind(this)
      }

      this.state = {
         data: {},
         pristine: true,
         submitting: false
      }

      findNodesinDOM(props.children, ...formComponentNames)
      .forEach(node => {
         this.state.data[node.props.name] = {
            value: node.props.value,
            meta: {
               error: null,
               touched: false
            }
         }
      })
   }

   componentWillReceiveProps(props) {
      const newState = { data: { ...this.state.data } }

      findNodesinDOM(props.children, ...formComponentNames)
      .forEach(node => {
         const value = this.state.data[node.props.name].value
         newState.data[node.props.name] = {
            value,
            meta: {
               ...this.state.data[node.props.name].meta,
               error: this.applyRulesToValue(node.props.rules, value)
            }
         }
      })

      this.setState(newState)
   }

   applyRulesToValue(rules=[], value) {
      for (let rule of rules) {
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
      } catch(e) {
         return undefined
      }
   }

   handleBlur(value, child) {
      const newState = {
         data: { ...this.state.data },
         pristine: false
      }
      newState.data[child.props.name] = {
         ...this.state.data[child.props.name],
         meta: {
            error: this.applyRulesToValue(child.props.rules, value),
            touched: true
         }
      }
      this.setState(newState)
   }

   handleChange(value, child) {
      const newState = { data: { ...this.state.data } }
      newState.data[child.props.name] = {
         value,
         meta: {
            error: this.applyRulesToValue(child.props.rules, value),
            touched: true
         }
      }
      this.setState(newState)
   }

   handleSubmit(event) {
      event.preventDefault()

      const data = {}
      const errors = {}

      // Blur and check all relevant children for errors
      const newState = { data: { ...this.state.data } }
      findNodesinDOM(this.props.children, ...formComponentNames)
      .forEach((node) => {
         newState.data[node.props.name] = {
            ...this.state.data[node.props.name],
            meta: {
               error: this.applyRulesToValue(node.props.rules, this.state.data[node.props.name].value),
               touched: true
            }
         }
      })

      this.setState(newState, () => {
         // Find data and errors
         Object.keys(this.state.data).forEach((key) => {
            data[key] = this.state.data[key].value
            if (this.state.data[key].meta.error) {
               errors[key] = this.state.data[key].meta.error
            }
         })

         // Pass data or errors in to appropriate event handler prop
         if (Object.keys(errors).length > 0) {
            if (this.props.onError) this.props.onError(errors)
         } else if (this.props.onSubmit) {
            const promise = this.props.onSubmit(data)
            if (promise instanceof Promise) {
               this.setState({ submitting: true }, () => {
                  promise
                  .then(() => this.setState({ submitting: false }))
                  .catch(() => this.setState({ submitting: false }))
               })
            }
         }
      })
   }

   render() {
      const domWithNewFormElements = replaceNodesInDOM(this.props.children, formComponentNames, (child, i, j) => (
         React.cloneElement(child, {
            form: this,
            key: `${i},${j}`,
            meta: this.state.data[child.props.name].meta || {},
            onBlur: (event) => {
               this.handleBlur(event.target.value, child)
               if (this.props.onBlur) this.props.onBlur(event)
            },
            onChange: (event, value) => {
               if (value || value === false) this.handleChange(value, child)
               else this.handleChange(event.target.value, child)
               if (this.props.onChange) this.props.onChange(event)
            },
            value: this.state.data[child.props.name].value
         })
      ))

      return (
         <form onSubmit={event => this.handleSubmit(event)}>
            {domWithNewFormElements}
         </form>
      )
   }
}
