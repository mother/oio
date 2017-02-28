import React, { Component } from 'react'
import formStyles from '../styles.less'

export default class CheckboxGroup extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      defaultValue: React.PropTypes.array,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      rules: React.PropTypes.array,
      value: React.PropTypes.array
   }

   static defaultProps = {
      defaultValue: []
   }

   static contextTypes = {
      OIOForm: React.PropTypes.object
   }

   static childContextTypes = {
      OIOFormCheckbox: React.PropTypes.object
   }

   constructor(props) {
      super(props)

      this.getValue = this.getValue.bind(this)
      this.handleChange = this.handleChange.bind(this)

      this.state = {
         error: props.error,
         value: props.value || props.defaultValue
      }
   }

   getChildContext() {
      const OIOFormCheckbox = {
         name: this.props.name,
         getValue: this.getValue
      }

      return { OIOFormCheckbox }
   }

   componentDidMount() {
      if (this.props.name) {
         this.context.OIOForm.setDefaultValue(this.props.name, this.state.value)
      }
   }

   componentWillReceiveProps(newProps) {
      if (newProps.value && newProps.value !== this.state.value) {
         this.setState({ value: newProps.value })
      }

      // TODO: If name changes, need to remove form value corresponding to old name
   }

   getValue() {
      return this.state.value
   }

   handleChange(event) {
      this.setState({ value: event.target.value })
      this.context.OIOForm.setValue(this.props.name, event.target.value)

      const error = this.context.OIOForm.validateValue(
         this.props.name,
         event.target.value,
         this.props.rules
      )

      this.setState({ error })
   }

   render() {
      return (
         <div className={formStyles.container} name={this.props.name}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <div onChange={this.handleChange}>
               {this.props.children}
            </div>
            {this.state.error &&
               <div className={formStyles.error}>
                  {this.state.error}
               </div>
            }
         </div>
      )
   }
}
