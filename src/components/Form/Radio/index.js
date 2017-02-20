import React, { Component } from 'react'
import formStyles from '../styles.less'

export default class Radio extends Component {
   static propTypes = {
      checked: React.PropTypes.bool,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      value: React.PropTypes.string
   }

   static defaultProps = {
      checked: false
   }

   constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
   }

   handleChange(event) {
      if (this.props.onChange) {
         const value = event.target.checked
            ? event.target.value
            : undefined

         this.props.onChange(event, value)
      }
   }

   render() {
      return (
         <span className={formStyles.container}>
            <label className={formStyles.labelRadio} htmlFor={this.props.id}>
               <input
                  id={this.props.id}
                  className={formStyles.inputRadio}
                  checked={this.props.checked}
                  type="radio"
                  name={this.props.name}
                  value={this.props.value}
                  onChange={this.handleChange}
                  onBlur={this.props.onBlur}
               />
               {this.props.label}
               {this.props.children}

               {/* TODO: Text is temporary until styling is fixed */}
               {this.props.checked && ` (checked)`}
            </label>
         </span>
      )
   }
}
