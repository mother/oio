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
      this.setState({ checked: event.target.checked })
      if (this.props.onChange) {
         this.props.onChange(event, event.target.checked)
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
            </label>
         </span>
      )
   }
}
