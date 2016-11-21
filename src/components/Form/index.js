import React, { Component } from 'react'

export default class Form extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      initialValues: React.PropTypes.object,
      onSubmit: React.PropTypes.func
   }

   constructor(props) {
      super(props)

      this.handleSubmit = this.handleSubmit.bind(this)

      // Set initialValues
      this.state = {}
      props.children.forEach((child) => {
         if (this.childIsRelevant(child)) {
            this.state[child.props.name] = {
               value: props.initialValues[child.props.name] || '',
               meta: {
                  touched: false,
                  error: false
               }
            }
         }
      })
   }

   childIsRelevant(child) {
      const types = ['input', 'textarea']
      return types.indexOf(child.type.type) !== -1
   }

   handleBlur(event, child) {
      const newState = {}
      newState[child.props.name] = {
         ...this.state[child.props.name],
         meta: {
            ...this.state[child.props.name].meta,
            touched: true
         }
      }
      this.setState(newState)
   }

   handleChange(event, child) {
      const newState = {}
      newState[child.props.name] = {
         ...this.state[child.props.name],
         value: event.target.value
      }
      this.setState(newState)
   }

   handleSubmit(event) {
      event.preventDefault()
      const data = {}
      Object.keys(this.state).forEach((key) => { data[key] = this.state[key].value })
      this.props.onSubmit(data)
   }

   render() {
      const childrenNew = []
      let counter = 1
      this.props.children.forEach((child) => {
         if (this.childIsRelevant(child)) {
            const childNew = React.cloneElement(child, {
               key: counter,
               meta: {},
               onBlur: (event) => { this.handleBlur(event, child) },
               onChange: (event) => { this.handleChange(event, child) },
               value: this.state[child.props.name].value || ''
            })
            childrenNew.push(childNew)
         } else {
            childrenNew.push(child)
         }
         counter += 1
      })

      return (
         <form
            onSubmit={this.handleSubmit}>
            {childrenNew}
         </form>
      )
   }
}
