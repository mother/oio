import React, { Component } from 'react'
import formStyles from '../styles.less'

export default class Switch extends Component {
   static propTypes = {
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      touched: React.PropTypes.bool,
      value: React.PropTypes.bool
   }

   static defaultProps = {
      value: false
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
   }

   constructor(props, context) {
      super(props, context)
      this.handleChange = this.handleChange.bind(this)
      this.state = { value: !!props.value }
   }

   componentWillReceiveProps(nextProps) {
      const newValue = !!nextProps.value
      if (this.state.value !== newValue) {
         this.setState({ value: newValue })
      }
   }

   handleChange(event) {
      this.setState({ value: event.target.checked })
      if (this.props.onChange) {
         this.props.onChange(event, event.target.checked)
      }
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
                  onBlur={this.props.onBlur}
               />
               <div className={formStyles.switchSlider} style={switchStyle} />
            </label>
            {this.props.touched && this.props.error &&
               <div className={formStyles.error}>
                  {this.props.error}
               </div>
            }
         </span>
      )
   }
}
