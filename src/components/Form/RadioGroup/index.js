import React, { Component } from 'react'
import formStyles from '../styles.less'

export default class RadioGroup extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      initialValue: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onChange: React.PropTypes.func,
      rules: React.PropTypes.array
   }

   static defaultProps = {
      initialValue: ''
   }

   static contextTypes = {
      OIOForm: React.PropTypes.object
   }

   static childContextTypes = {
      OIOFormRadio: React.PropTypes.object
   }

   constructor(props) {
      super(props)

      this.state = {
         error: props.error,
         initialValue: null,
         value: props.initialValue
      }
   }

   getChildContext() {
      const OIOFormRadio = {
         name: this.props.name,
         getValue: this.getValue
      }

      return { OIOFormRadio }
   }

   componentDidMount() {
      if (this.context.OIOForm && this.props.name) {
         this.context.OIOForm.setInitialValue(this.props.name, this.state.value)
         this.context.OIOForm.setRules(this.props.name, this.props.rules)
      }
   }

   componentWillReceiveProps(nextProps) {
      // TODO: If name changes, need to remove form value corresponding to old name

      if (nextProps.initialValue && !this.state.initialValue) {
         this.setState({
            initialValue: nextProps.initialValue,
            value: nextProps.initialValue
         })

         if (this.context.OIOForm) {
            this.context.OIOForm.setValue(this.props.name, nextProps.initialValue)
         }
      }

      if (this.context.OIOForm) {
         this.setState({
            error: this.context.OIOForm.getErrors().errors[this.props.name]
         })
      }
   }

   getValue = () => this.state.value

   handleChange = (event) => {
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
