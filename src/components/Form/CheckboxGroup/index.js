import React, { Component } from 'react'
import { createOIOFormField } from '..'
import formStyles from '../styles.less'

class CheckboxGroup extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      readOnly: React.PropTypes.bool,
      triggerChange: React.PropTypes.func,
      triggerValidation: React.PropTypes.func,
      value: React.PropTypes.array
   }

   static defaultProps = {
      value: []
   }

   static childContextTypes = {
      OIOFormCheckbox: React.PropTypes.object
   }

   getChildContext() {
      const OIOFormCheckbox = {
         name: this.props.name,
         getProps: this.getProps
      }

      return { OIOFormCheckbox }
   }

   getProps = () => this.props

   handleChange = (event) => {
      const checkboxChecked = event.target.checked
      const checkboxValue = event.target.value
      const checkboxGroupValue = [...this.props.value]

      if (checkboxChecked) {
         checkboxGroupValue.push(checkboxValue)
      } else {
         const index = checkboxGroupValue.indexOf(checkboxValue)
         if (index > -1) {
            checkboxGroupValue.splice(index, 1)
         }
      }

      this.props.triggerChange(event, checkboxGroupValue, () => {
         this.props.triggerValidation()
      })
   }

   render() {
      return (
         <div className={formStyles.container} name={this.props.name}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <div onChange={!this.props.readOnly && this.handleChange}>
               {this.props.children}
            </div>
            {this.props.error &&
               <div className={formStyles.error}>
                  {this.props.error}
               </div>
            }
         </div>
      )
   }
}

export default createOIOFormField()(CheckboxGroup)
