import React, { Component } from 'react'

import { replaceNodesInDOM } from '../../../utils/dom'
import formStyles from '../styles.less'

export default class CheckboxGroup extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      meta: React.PropTypes.object,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func
   }

   constructor(props, context) {
      super(props, context)
      this.state = { value: props.value || [] }
   }

   componentWillReceiveProps(props) {
      this.setState({ value: props.value })
   }

   handleChange(event) {
      const set = new Set(this.state.value)

      if (event.target.checked) set.add(event.target.value)
      else set.delete(event.target.value)

      this.setState({ value: Array.from(set) }, () => {
         this.props.onChange(event, this.state.value)
      })
   }

   render() {
      let counter = 0
      const domWithNewCheckboxes = replaceNodesInDOM(this.props.children, 'Checkbox', (node, i, j) => {
         const key = node.props.value
         const id = node.props.id || `${this.props.name}-${counter++}`
         return React.cloneElement(node, {
            key,
            id,
            name: this.props.name,
            checked: this.state.value.includes(node.props.value),
            onBlur: this.props.onBlur,
            onChange: event => this.handleChange(event)
         })
      })

      return (
         <div className={formStyles.container} name={this.props.name}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            {domWithNewCheckboxes}
            {this.props.meta && this.props.meta.touched && this.props.meta.error &&
               <div className={formStyles.error}>
                  {this.props.meta.error}
               </div>
            }
         </div>
      )
   }
}
