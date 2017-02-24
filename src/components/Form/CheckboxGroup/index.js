import React, { Component } from 'react'
import { replaceNodesInDOM } from '../../../utils/dom'
import formStyles from '../styles.less'

export default class CheckboxGroup extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      touched: React.PropTypes.bool,
      value: React.PropTypes.array
   }

   static defaultProps = {
      value: []
   }

   constructor(props, context) {
      super(props, context)

      this.handleChange = this.handleChange.bind(this)
      this.state = { value: props.value || [] }
   }

   componentWillReceiveProps(newProps) {
      const newValue = newProps.value || []
      if (newValue.sort().join() !== this.state.value.sort().join()) {
         this.setState({ value: newValue })
      }
   }

   handleChange(event) {
      const set = new Set(this.state.value)

      if (event.target.checked) set.add(event.target.value)
      else set.delete(event.target.value)

      const newValue = Array.from(set)
      this.setState({ value: newValue })
      if (this.props.onChange) {
         this.props.onChange(event, newValue)
      }
   }

   render() {
      let counter = 0
      const domWithNewCheckboxes = replaceNodesInDOM(this.props.children, 'Checkbox', (node, i, j) => {
         const key = node.props.value
         const id = node.props.id || `${this.props.name}-${counter += 1}`
         return React.cloneElement(node, {
            key,
            id,
            name: this.props.name,
            checked: this.state.value.includes(node.props.value),
            onBlur: this.props.onBlur,
            onChange: this.handleChange
         })
      })

      return (
         <div className={formStyles.container} name={this.props.name}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            {domWithNewCheckboxes}
            {this.props.touched && this.props.error &&
               <div className={formStyles.error}>
                  {this.props.error}
               </div>
            }
         </div>
      )
   }
}
