import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

export default class Select extends Component {
   static propTypes = {
      className: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      meta: React.PropTypes.object,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      options: React.PropTypes.array,
      value: React.PropTypes.string
   }

   static type = 'select'

   constructor(props, context) {
      super(props, context)

      let initialValue
      this.props.options.forEach((option) => {
         if (option.selected) initialValue = option.value
      })

      this.state = { value: initialValue }

      this.handleChange = this.handleChange.bind(this)
   }

   handleChange(event) {
      this.setState({ value: event.target.value })
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
               value={this.props.value || this.state.value}
               name={this.props.name}
               onBlur={this.props.onBlur}
               onChange={(event) => {
                  this.handleChange(event)
                  this.props.onChange(event)
               }}>
               {children}
            </select>
            {this.props.meta && this.props.meta.touched && this.props.meta.error &&
               <div className={formStyles.error}>
                  {this.props.meta.error}
               </div>
            }
         </div>
      )
   }
}
