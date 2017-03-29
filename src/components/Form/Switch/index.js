import React, { Component } from 'react'
import { createOIOFormField } from '..'
import formStyles from '../styles.less'

class Switch extends Component {
   static propTypes = {
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      readOnly: React.PropTypes.bool,
      triggerChange: React.PropTypes.func,
      triggerValidation: React.PropTypes.func,
      value: React.PropTypes.bool
   }

   static defaultProps = {
      value: false
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
   }

   handleChange = (event) => {
      const newValue = !this.props.value
      this.props.triggerChange(event, newValue, () => {
         this.props.triggerValidation()
      })
   }

   render() {
      const primaryColor = this.context.OIOStyles.primaryColor
      const switchStyle = {}

      if (this.props.value) {
         switchStyle.backgroundColor = primaryColor
      }

      return (
         <span className={formStyles.container} name={this.props.name}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <label className={formStyles.switch} htmlFor={this.props.id}>
               <input
                  id={this.props.id}
                  checked={this.props.value}
                  type="checkbox"
                  name={this.props.name}
                  onChange={this.props.readOnly ? undefined : this.handleChange}
                  readOnly={this.props.readOnly}
               />
               <div className={formStyles.switchSlider} style={switchStyle} />
            </label>
            {this.props.error &&
               <div className={formStyles.error}>
                  {this.props.error}
               </div>
            }
         </span>
      )
   }
}

export default createOIOFormField()(Switch)
