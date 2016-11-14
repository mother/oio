import React, { Component } from 'react'

export default class Form extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      initialValues: React.PropTypes.object,
      onSubmit: React.PropTypes.func
   }

   constructor(props) {
      super(props)

      this.state = props.initialValues || {}
   }

   render() {
      const childrenNew = []
      const types = ['input', 'textarea']
      let counter = 1
      this.props.children.forEach((child) => {
         if (types.indexOf(child.type.type) !== -1) {
            const childNew = React.cloneElement(child, {
               key: counter,
               onChange: event => this.setState({ [child.props.name]: event.target.value }),
               value: this.state[child.props.name]
            })
            childrenNew.push(childNew)
         } else {
            childrenNew.push(child)
         }
         counter += 1
      })

      return (
         <form
            onSubmit={(event) => {
               event.preventDefault()
               this.props.onSubmit(this.state)
            }}>
            {childrenNew}
         </form>
      )
   }
}
