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

   handleChange(event) {
      this.setState({ value: event.target.value })
      this.context.OIOForm.setValue(this.props.name, event.target.value)

      if (this.props.onChange) {
         this.props.onChange(event, event.target.value)
      }

      const error = this.context.OIOForm.validateValue(
         this.props.name,
         event.target.value,
         this.props.rules
      )

      if (error) {
         this.setState({ error })
      } else {
         this.setState({ error: undefined })
      }
   }

   render() {
      const classes = [styles.select, this.props.className]

      const children = []
      this.props.options.forEach((option) => {
         children.push(
            <option key={option.value} value={option.value}>{option.text}</option>
         )
      })

      return (
         <div className={formStyles.container}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <select
               className={classNames(classes)}
               id={this.props.id}
               value={this.props.value}
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
