import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { createOIOFormField } from '..'
import formStyles from '../styles.less'

class Switch extends Component {
   static propTypes = {
      error: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      readOnly: PropTypes.bool,
      triggerChange: PropTypes.func,
      triggerValidation: PropTypes.func,
      value: PropTypes.bool
   }

   static defaultProps = {
      value: false
   }

   static contextTypes = {
      OIOStyles: PropTypes.object
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
