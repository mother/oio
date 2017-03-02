import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

export default class Textarea extends Component {
   static propTypes = {
      className: React.PropTypes.string,
      defaultValue: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      placeholder: React.PropTypes.string,
      rows: React.PropTypes.string,
      rules: React.PropTypes.array,
      value: React.PropTypes.string
   }

   static defaultProps = {
      disabled: false,
      rows: '5',
      defaultValue: ''
   }

   static contextTypes = {
      OIOForm: React.PropTypes.object,
      OIOStyles: React.PropTypes.object
   }

   constructor(props) {
      super(props)

      this.handleBlur = this.handleBlur.bind(this)
      this.handleChange = this.handleChange.bind(this)

      this.state = {
         error: props.error,
         value: props.value || props.defaultValue
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

      this.setState({ error: this.context.OIOForm.getErrors().errors[this.props.name] })

      // TODO: If name changes, need to remove form value corresponding to old name
   }

   handleBlur(event) {
      const error = this.context.OIOForm.validateValue(
         this.props.name,
         event.target.value,
         this.props.rules
      )

      this.setState({ error })

      if (this.props.onBlur) {
         this.props.onBlur(event)
      }
   }

   handleChange(event) {
      this.setState({ value: event.target.value })
      this.context.OIOForm.setValue(this.props.name, event.target.value)

      if (this.props.onChange) {
         this.props.onChange(event, event.target.value)
      }
   }

   render() {
      const classes = [styles.textarea, this.props.className]

      return (
         <div className={formStyles.container}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <textarea
               className={classNames(classes)}
               disabled={this.props.disabled}
               id={this.props.id}
               onBlur={this.handleBlur}
               onChange={this.handleChange}
               name={this.props.name}
               placeholder={this.props.placeholder}
               value={this.state.value}
               rows={this.props.rows}
            />
            {this.state.error &&
               <div className={formStyles.error}>
                  {this.state.error}
               </div>
            }
         </div>
      )
   }
}
