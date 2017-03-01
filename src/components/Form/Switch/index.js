import React, { Component } from 'react'
import formStyles from '../styles.less'

export default class Switch extends Component {
   static propTypes = {
      defaultValue: React.PropTypes.bool,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
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
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.value && nextProps.value !== this.state.value) {
         this.setState({ value: nextProps.value })
         this.context.OIOForm.setValue(this.props.name, nextProps.value)
      }
   }

   handleChange(event) {
      const value = !this.state.value
      this.setState({ value })
      this.context.OIOForm.setValue(this.props.name, value)
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
