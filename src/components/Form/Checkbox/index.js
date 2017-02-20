import React, { Component } from 'react'
import formStyles from '../styles.less'

export default class Checkbox extends Component {
   static propTypes = {
      checked: React.PropTypes.bool,
      children: React.PropTypes.node,
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
      this.state = {
         checked: props.checked
      }
   }

   handleChange(event) {
      this.setState({
         checked: event.target.checked
      })

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
            <label className={formStyles.labelCheckbox} htmlFor={this.props.id}>
               <input
                  type="checkbox"
                  id={this.props.id}
                  checked={this.state.checked}
                  className={formStyles.inputCheckbox}
                  name={this.props.name}
                  value={this.props.value}
                  onChange={this.handleChange}
                  onBlur={this.props.onBlur}
               />
               {this.props.label}
               {this.props.children}
               
               {/* TODO: Text is temporary until styling is fixed */}
               {this.state.checked && ` (checked)`}
            </label>
         </span>
      )
   }
}
