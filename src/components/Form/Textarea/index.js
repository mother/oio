import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

export default class Textarea extends Component {
   static propTypes = {
      className: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      placeholder: React.PropTypes.string,
      rows: React.PropTypes.string,
      touched: React.PropTypes.bool,
      value: React.PropTypes.string
   }

   static defaultProps = {
      disabled: false,
      rows: '5',
      value: ''
   }

   constructor(props, context) {
      super(props, context)
      this.handleChange = this.handleChange.bind(this)
      this.state = {
         value: props.value
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value) {
         this.setState({ value: nextProps.value })
      }
   }

   handleChange(event) {
      this.setState({ value: event.target.value })
      if (this.props.onChange) {
         this.props.onChange(event, event.target.value)
      }
   }

   render() {
      const classes = [styles.textarea, this.props.className]

      return (
         <div className={formStyles.container}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <textarea
               className={classNames(classes)}
               disabled={this.props.disabled}
               id={this.props.id}
               onBlur={this.props.onBlur}
               onChange={this.handleChange}
               name={this.props.name}
               placeholder={this.props.placeholder}
               value={this.state.value}
               rows={this.props.rows}
            />
            {this.props.touched && this.props.error &&
               <div className={formStyles.error}>
                  {this.props.error}
               </div>
            }
         </div>
      )
   }
}
