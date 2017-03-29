import React, { Component } from 'react'
import { createOIOFormField } from '..'
import formStyles from '../styles.less'

class RadioGroup extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      readOnly: React.PropTypes.bool,
      triggerChange: React.PropTypes.func,
      triggerValidation: React.PropTypes.func
   }

   static defaultProps = {
      value: []
   }

   static childContextTypes = {
      OIOFormRadio: React.PropTypes.object
   }

   getChildContext() {
      const OIOFormRadio = {
         name: this.props.name,
         getProps: this.getProps
      }

      return { OIOFormRadio }
   }

   getProps = () => this.props

   handleChange = (event) => {
      this.props.triggerChange(event, event.target.value, () => {
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

export default createOIOFormField()(RadioGroup)
