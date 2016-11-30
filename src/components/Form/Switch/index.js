import React, { Component } from 'react'

import formStyles from '../styles.less'

export default class Switch extends Component {
   static propTypes = {
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      meta: React.PropTypes.object,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      value: React.PropTypes.oneOfType([
         React.PropTypes.string,
         React.PropTypes.bool
      ])
   }

   static type = 'Switch'

   constructor(props, context) {
      super(props, context)

      this.state = { value: !!props.value }
   }

   componentWillReceiveProps(props) {
      this.setState({ value: !!props.value })
   }

   handleChange(event) {
      this.setState({ value: event.target.checked }, () => {
         this.props.onChange(event, this.state.value)
      })
   }

   render() {
      return (
         <span className={formStyles.container} name={this.props.name}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <label className={formStyles.switch} htmlFor={this.props.id}>
               <input
                  id={this.props.id}
                  checked={this.state.value}
                  type="checkbox"
                  name={this.props.name}
                  onChange={event => this.handleChange(event)}
                  onBlur={this.props.onBlur}
               />
               <div className={formStyles.switchSlider} />
            </label>
            {this.props.meta && this.props.meta.touched && this.props.meta.error &&
               <div className={formStyles.error}>
                  {this.props.meta.error}
               </div>
            }
         </span>
      )
   }
}
