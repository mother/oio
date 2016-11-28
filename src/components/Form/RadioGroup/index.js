import React, { Component } from 'react'
import formStyles from '../styles.less'

export default class Select extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      id: React.PropTypes.string,
      initialValue: React.PropTypes.string,
      label: React.PropTypes.string,
      meta: React.PropTypes.object,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func
   }

   static type = 'radio'

   constructor(props, context) {
      super(props, context)

      let initialValue
      this.props.children.forEach((child) => {
         if (child.props.checked) initialValue = child.props.value
      })

      if (props.initialValue) initialValue = props.initialValue

      this.state = { value: initialValue }
   }

   render() {
      const childrenNew = []
      let counter = 1
      this.props.children.forEach((child) => {
         if (child.type.type === 'radio') {
            childrenNew.push(React.cloneElement(child, {
               key: counter,
               id: counter,
               name: this.props.name,
               defaultChecked: this.state.value === child.props.value,
               onBlur: this.props.onBlur,
               onChange: this.props.onChange
            }))
            counter += 1
         }
      })

      return (
         <div className={formStyles.container}>
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
