import React, { Component } from 'react'

import { mapRelevantChildren } from '../../../utils'
import formStyles from '../styles.less'

export default class RadioGroup extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      meta: React.PropTypes.object,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func
   }

   static type = 'RadioGroup'

   constructor(props, context) {
      super(props, context)

      let value
      mapRelevantChildren(props.children, ['Radio'], (child) => {
         if (child.props.checked) value = child.props.value
      })
      this.state = { value }
   }

   componentWillReceiveProps(props) {
      this.setState({ value: props.value })
   }

   render() {
      let counter = 1
      const childrenNew = mapRelevantChildren(this.props.children, ['Radio'], (child) => {
         const childNew = React.cloneElement(child, {
            key: `${this.props.name}-${counter}`,
            id: `${this.props.name}-${counter}`,
            name: this.props.name,
            checked: this.state.value === child.props.value,
            onBlur: this.props.onBlur,
            onChange: this.props.onChange
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
