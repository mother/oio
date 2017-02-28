import React, { Component } from 'react'
import formStyles from '../styles.less'

export default class RadioGroup extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      defaultValue: React.PropTypes.string,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      value: React.PropTypes.string
   }

   static defaultProps = {
      defaultValue: ''
   }

   static contextTypes = {
      OIOForm: React.PropTypes.object
   }

   static childContextTypes = {
      OIOFormRadioGroup: React.PropTypes.object
   }

   constructor(props) {
      super(props)

      this.state = {
         error: props.error,
         value: props.value || props.defaultValue
      }
   }

   getChildContext() {
      const OIOFormRadioGroup = {
         name: this.props.name
      }

      return { OIOFormRadioGroup }
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

   render() {
      return (
         <div className={formStyles.container} name={this.props.name}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            {this.props.children}
            {this.state.error &&
               <div className={formStyles.error}>
                  {this.state.error}
               </div>
            }
         </div>
      )
   }
}
