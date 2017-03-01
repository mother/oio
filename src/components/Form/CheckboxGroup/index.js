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

   componentWillReceiveProps(nextProps) {
      if (nextProps.value && nextProps.value !== this.state.value) {
         this.setState({ value: nextProps.value })
         this.context.OIOForm.setValue(this.props.name, nextProps.value)
      }

      // TODO: If name changes, need to remove form value corresponding to old name
   }

   getValue() {
      return this.state.value
   }

   handleChange(event) {
      const checkboxChecked = event.target.checked
      const checkboxValue = event.target.value
      const checkboxGroupValue = this.state.value

      if (checkboxChecked) {
         checkboxGroupValue.push(checkboxValue)
      } else {
         const index = checkboxGroupValue.indexOf(checkboxValue)
         if (index > -1) checkboxGroupValue.splice(index, 1)
      }

      this.setState({ checkboxGroupValue })
      this.context.OIOForm.setValue(this.props.name, checkboxGroupValue)

      const error = this.context.OIOForm.validateValue(
         this.props.name,
         checkboxGroupValue,
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
