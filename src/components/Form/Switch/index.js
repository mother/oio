import React, { Component } from 'react'
import formStyles from '../styles.less'

export default class Switch extends Component {
   static propTypes = {
      defaultValue: React.PropTypes.bool,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onChange: React.PropTypes.func,
      rules: React.PropTypes.array,
      value: React.PropTypes.bool
   }

   static defaultProps = {
      defaultValue: false
   }

   static contextTypes = {
      OIOForm: React.PropTypes.object,
      OIOStyles: React.PropTypes.object
   }

   constructor(props) {
      super(props)

      this.handleChange = this.handleChange.bind(this)

      this.state = {
         error: props.error,
         value: props.value === true || props.value === false
            ? props.value
            : props.defaultValue
      }
   }

   componentDidMount() {
      if (this.props.name) {
         this.context.OIOForm.setDefaultValue(this.props.name, this.state.value)
         this.context.OIOForm.setRules(this.props.name, this.props.rules)
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.value && nextProps.value !== this.state.value) {
         this.setState({ value: nextProps.value })
         this.context.OIOForm.setValue(this.props.name, nextProps.value)
      }

      this.setState({ error: this.context.OIOForm.getErrors()[this.props.name] })

      // TODO: If name changes, need to remove form value corresponding to old name
   }

   handleChange(event) {
      const value = !this.state.value
      this.setState({ value })
      this.context.OIOForm.setValue(this.props.name, value)

      if (this.props.onChange) {
         this.props.onChange(event, event.target.value)
      }

      const error = this.context.OIOForm.validateValue(
         this.props.name,
         value,
         this.props.rules
      )

      this.setState({ error })
   }

   render() {
      const primaryColor = this.context.OIOStyles.primaryColor
      const switchStyle = {}

      if (this.state.value) {
         switchStyle.backgroundColor = primaryColor
      }

      return (
         <span className={formStyles.container} name={this.props.name}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <label className={formStyles.switch} htmlFor={this.props.id}>
               <input
                  id={this.props.id}
                  checked={this.state.value}
                  type="checkbox"
                  name={this.props.name}
                  onChange={this.handleChange}
               />
               <div className={formStyles.switchSlider} style={switchStyle} />
            </label>
            {this.state.error &&
               <div className={formStyles.error}>
                  {this.state.error}
               </div>
            }
         </span>
      )
   }
}
