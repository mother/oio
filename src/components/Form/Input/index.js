import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

export default class Input extends Component {
   static propTypes = {
      className: React.PropTypes.string,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      initialValue: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      placeholder: React.PropTypes.string,
      type: React.PropTypes.string,
      readOnly: React.PropTypes.bool,
      rules: React.PropTypes.array,
      value: React.PropTypes.string
   }

   static defaultProps = {
      type: 'text',
      initialValue: ''
   }

   static contextTypes = {
      OIOForm: React.PropTypes.object,
      OIOStyles: React.PropTypes.object
   }

   constructor(props) {
      super(props)

      this.initialized = props.value || props.initialValue
      this.state = {
         error: props.error,
         value: props.value || props.initialValue
      }
   }

   componentDidMount() {
      if (this.context.OIOForm && this.props.name) {
         this.context.OIOForm.setInitialValue(this.props.name, this.state.value)
         this.context.OIOForm.setRules(this.props.name, this.props.rules)
      }
   }

   componentWillReceiveProps(nextProps) {
      // TODO: If name changes, need to remove form value corresponding to old name

      let nextValue

      // If a value is provided
      if (nextProps.value && this.props.value !== nextProps.value) {
         this.initialized = true
         nextValue = nextProps.value

      // If the field is not initialized, and an initialValue is provided
      } else if (nextProps.initialValue && !this.initialized) {
         this.initialized = true
         nextValue = nextProps.initialValue
      }

      if (nextValue) {
         this.setState({ value: nextValue })
         if (this.context.OIOForm) {
            this.context.OIOForm.setValue(this.props.name, nextValue)
         }

         if (this.context.OIOForm) {
            this.setState({
               error: this.context.OIOForm.getErrors().errors[this.props.name]
            })
         }
      }
   }

   handleBlur = (event) => {
      if (this.context.OIOForm) {
         const error = this.context.OIOForm.validateValue(
            this.props.name,
            event.target.value,
            this.props.rules
         )

         this.setState({ error })
      }

      if (this.props.onBlur) {
         this.props.onBlur(event)
      }
   }

   handleChange = (event) => {
      this.setState({ value: event.target.value })

      if (this.context.OIOForm) {
         this.context.OIOForm.setValue(this.props.name, event.target.value)
      }

      if (this.props.onChange) {
         this.props.onChange(event, event.target.value)
      }
   }

   render() {
      const classes = [styles.input, this.props.className]
      const inputStyles = {}

      if (this.context.OIOStyles && this.context.OIOStyles.fontFamily) {
         inputStyles.fontFamily = this.context.OIOStyles.fontFamily
      }

      let handleChange
      if (this.props.value && this.props.onChange) {
         handleChange = this.props.onChange
      } else if (!this.props.value) {
         handleChange = this.handleChange
      }

      const readOnly = this.props.readOnly || !handleChange

      return (
         <div className={formStyles.container}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <input
               style={inputStyles}
               className={classNames(classes)}
               id={this.props.id}
               onBlur={this.handleBlur}
               onChange={handleChange}
               name={this.props.name}
               placeholder={this.props.placeholder}
               readOnly={readOnly}
               type={this.props.type}
               value={this.state.value}
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
