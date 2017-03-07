import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

export default class Select extends Component {
   static propTypes = {
      className: React.PropTypes.string,
      defaultValue: React.PropTypes.string,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onChange: React.PropTypes.func,
      options: React.PropTypes.array,
      rules: React.PropTypes.array,
      value: React.PropTypes.string
   }

   static defaultProps = {
      defaultValue: '',
      options: []
   }

   static contextTypes = {
      OIOForm: React.PropTypes.object
   }

   constructor(props) {
      super(props)

      this.handleChange = this.handleChange.bind(this)

      this.state = {
         error: props.error,
         value: props.value || props.defaultValue
      }
   }

   componentDidMount() {
      if (this.context.OIOForm && this.props.name) {
         this.context.OIOForm.setDefaultValue(this.props.name, this.state.value)
         this.context.OIOForm.setRules(this.props.name, this.props.rules)
      }
   }

   componentWillReceiveProps(nextProps) {
      // TODO: If name changes, need to remove form value corresponding to old name
      if (nextProps.value && nextProps.value !== this.state.value) {
         this.setState({ value: nextProps.value })

         if (this.context.OIOForm) {
            this.context.OIOForm.setValue(this.props.name, nextProps.value)
         }
      }

      if (this.context.OIOForm) {
         this.setState({
            error: this.context.OIOForm.getErrors().errors[this.props.name]
         })
      }
   }

   handleChange(event) {
      this.setState({ value: event.target.value })

      if (this.context.OIOForm) {
         this.context.OIOForm.setValue(this.props.name, event.target.value)

         const error = this.context.OIOForm.validateValue(
            this.props.name,
            event.target.value,
            this.props.rules
         )

         this.setState({ error })
      }

      if (this.props.onChange) {
         this.props.onChange(event, event.target.value)
      }
   }

   render() {
      const classes = [styles.select, this.props.className]

      const children = []
      this.props.options.forEach((option) => {
         children.push(
            <option
               key={option.value}
               value={option.value}
               disabled={option.disabled}>
               {option.text}
            </option>
         )
      })

      return (
         <div className={formStyles.container}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <select
               className={classNames(classes)}
               id={this.props.id}
               value={this.state.value}
               name={this.props.name}
               onChange={this.handleChange}>
               {children}
            </select>
            {this.state.error &&
               <div className={formStyles.error}>
                  {this.state.error}
               </div>
            }
         </div>
      )
   }
}
