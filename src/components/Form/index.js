import React, { Component } from 'react'
import dot from 'dot-object'

import { mapRelevantChildren } from '../../utils'

const names = ['Input', 'Textarea', 'Select', 'RadioGroup']

export default class Form extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      onError: React.PropTypes.func,
      onSubmit: React.PropTypes.func
   }

   constructor(props) {
      super(props)

      this.handleSubmit = this.handleSubmit.bind(this)

      this.state = {
         data: {},
         pristine: true
      }

      mapRelevantChildren(props.children, names, (child) => {
         this.state.data[child.props.name] = {
            value: child.props.value,
            meta: {
               error: null,
               touched: false
            }
         }
      })
   }

   componentWillReceiveProps(props) {
      const newState = { data: { ...this.state.data } }

      mapRelevantChildren(props.children, names, (child) => {
         // Radio
         let radioValue
         if (child.type.type === 'RadioGroup') {
            radioValue = child.props.checked
               ? child.props.value
               : null
         }

         const value = (
            this.state.data[child.props.name].value ||
            child.props.value ||
            radioValue ||
            ''
         )

         newState.data[child.props.name] = {
            value,
            meta: {
               ...this.state.data[child.props.name].meta,
               error: this.getError(child, value)
            }
         }
      })
      this.setState(newState)
   }

   getRuleTestFromString(str) {
      switch (str) {
         case 'required':
            return value => !!value
         case 'email':
            return (value) => {
               const regex = /^[a-zA-Z0-9.!#$%&amp;’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ // eslint-disable-line max-len
               return regex.test(value)
            }
         default:
            return () => true
      }
   }

   getRuleMessageFromString(str) {
      switch (str) {
         case 'required':
            return 'Required.'
         case 'email':
            return 'Must be a valid email.'
         default:
            return 'Error.'
      }
   }

   getError(child, value) {
      const rules = child.props.rules
      if (!rules) return null

      for (let i = 0; i < rules.length; i += 1) {
         const rule = rules[i]

         let test
         let message

         if (typeof rule === 'string') {
            test = this.getRuleTestFromString(rule)
            message = this.getRuleMessageFromString(rule)
         } else if (typeof rule === 'object') {
            if (typeof rule.test === 'string') {
               test = this.getRuleTestFromString(rule.test)
               message = rule.message || this.getRuleMessageFromString(rule.test)
            } else {
               test = rule.test
               message = rule.message
            }
         }

         if (!test(value)) return message
      }

      return null
   }

   childIsRelevant(child) {
      const types = ['input', 'textarea', 'select', 'radio', 'checkbox']
      return types.includes(child.type.type)
   }

   handleBlur(event, child) {
      const value = event.target.value
      const newState = {
         data: { ...this.state.data },
         pristine: false
      }
      newState.data[child.props.name] = {
         ...this.state.data[child.props.name],
         meta: {
            error: this.getError(child, value),
            touched: true
         }
      }
      this.setState(newState)
   }

   handleChange(event, child) {
      const value = event.target.value
      const newState = { data: { ...this.state.data } }
      newState.data[child.props.name] = {
         value,
         meta: {
            error: this.getError(child, value),
            touched: true
         }
      }
      this.setState(newState)
   }

   handleSubmit(event) {
      event.preventDefault()

      const data = {}
      const errors = {}

      // Find data and errors
      Object.keys(this.state.data).forEach((key) => {
         data[key] = this.state.data[key].value
         if (this.state.data[key].meta.error) {
            errors[key] = this.state.data[key].meta.error
         }
      })

      if (Object.keys(errors).length > 0) {
         // Blur all to show errors
         const newState = { data: { ...this.state.data } }
         mapRelevantChildren(this.props.children, names, (child) => {
            newState.data[child.props.name] = {
               ...this.state.data[child.props.name],
               meta: {
                  ...this.state.data[child.props.name].meta,
                  touched: true
               }
            }
         })
         this.setState(newState)

         if (this.props.onError) this.props.onError(dot.object(errors))
      } else if (this.props.onSubmit) {
         const promise = this.props.onSubmit(dot.object(data))
         if (promise instanceof Promise) {
            this.setState({ submitting: true }, () => {
               promise
               .then(() => this.setState({ submitting: false }))
               .catch(() => this.setState({ submitting: false }))
            })
         }
      }
   }

   render() {
      let counter = 1
      const childrenNew = mapRelevantChildren(this.props.children, names, (child) => {
         const childNew = React.cloneElement(child, {
            form: this,
            key: counter += 1,
            meta: this.state.data[child.props.name].meta || {},
            onBlur: (event) => {
               this.handleBlur(event, child)
               if (child.props.onBlur) child.props.onBlur(event)
            },
            onChange: (event) => {
               this.handleChange(event, child)
               if (child.props.onChange) child.props.onChange(event)
            },
            value: this.state.data[child.props.name].value
         })
         return childNew
      })

      return (
         <form
            onSubmit={(event) => {
               this.handleSubmit(event)
            }}>
            {childrenNew}
         </form>
      )
   }
}
