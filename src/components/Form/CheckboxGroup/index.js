import React, { Component } from 'react'

import { mapRelevantChildren } from '../../../utils'
import formStyles from '../styles.less'

export default class Select extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      meta: React.PropTypes.object,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func
   }

   static type = 'CheckboxGroup'

   constructor(props, context) {
      super(props, context)

      let value
      mapRelevantChildren(props.children, ['Checkbox'], (child) => {
         if (child.props.checked) value = child.props.value
      })
      this.state = { value: value ? [value] : [] }
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
      let counter = 1
      const childrenNew = mapRelevantChildren(this.props.children, ['Checkbox'], (child) => {
         const childNew = React.cloneElement(child, {
            key: `${this.props.name}-${counter}`,
            id: `${this.props.name}-${counter}`,
            name: this.props.name,
            checked: this.state.value.indexOf(child.props.value) !== -1,
            onBlur: this.props.onBlur,
            onChange: event => this.handleChange(event)
         })
         counter += 1
         return childNew
      })

      return (
         <div className={formStyles.container} name={this.props.name}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            {childrenNew}
            {this.props.meta && this.props.meta.touched && this.props.meta.error &&
               <div className={formStyles.error}>
                  {this.props.meta.error}
               </div>
            }
         </div>
      )
   }
}
