import React, { Component } from 'react'
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

   static type = 'radio'

   constructor(props, context) {
      super(props, context)

      this.state = {}
   }

   handleChange(event) {
      event.target.checked = true
   }

   render() {
      const childrenNew = []
      let counter = 1
      this.props.children.forEach((child) => {
         if (child.type.name === 'Radio') {
            childrenNew.push(React.cloneElement(child, {
               key: counter,
               id: counter,
               name: this.props.name,
               onBlur: this.props.onBlur,
               onChange: (event) => {
                  this.handleChange(event)
                  this.props.onChange(event)
               }
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
