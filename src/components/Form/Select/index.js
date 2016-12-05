import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

export default class Select extends Component {
   static propTypes = {
      className: React.PropTypes.string,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      options: React.PropTypes.array,
      touched: React.PropTypes.bool,
      value: React.PropTypes.string
   }

   constructor(props, context) {
      super(props, context)
      this.state = { value: undefined }
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
               value={this.props.value}
               name={this.props.name}
               onBlur={this.props.onBlur}
               onChange={(event) => {
                  this.handleChange(event)
                  this.props.onChange(event)
               }}>
               {children}
            </select>
            {this.props.touched && this.props.error &&
               <div className={formStyles.error}>
                  {this.props.error}
               </div>
            }
         </div>
      )
   }
}
