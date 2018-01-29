import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { createOIOFormField } from '..'
import formStyles from '../styles.less'

class RadioGroup extends Component {
   static propTypes = {
      children: PropTypes.node,
      error: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      readOnly: PropTypes.bool,
      triggerChange: PropTypes.func,
      triggerValidation: PropTypes.func
   }

   static defaultProps = {
      value: []
   }

   static childContextTypes = {
      OIOFormRadio: PropTypes.object
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
