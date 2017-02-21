import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

export default class Input extends Component {
   static propTypes = {
      className: React.PropTypes.string,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      placeholder: React.PropTypes.string,
      touched: React.PropTypes.bool,
      type: React.PropTypes.string,
      value: React.PropTypes.string
   }

   static defaultProps = {
      type: 'text',
      value: ''
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
   }

   constructor(props, context) {
      super(props, context)
      this.handleChange = this.handleChange.bind(this)
      this.state = {
         value: props.value
      }
   }

   componentWillReceiveProps(newProps) {
      if (newProps.value !== this.state.value) {
         this.setState({ value: newProps.value })
      }
   }

   handleChange(event) {
      this.setState({ value: event.target.value })
      if (this.props.onChange) {
         this.props.onChange(event, event.target.value)
      }
   }

   render() {
      const classes = [styles.input, this.props.className]
      const inputStyles = {}

      if (this.context.OIOStyles && this.context.OIOStyles.fontFamily) {
         inputStyles.fontFamily = this.context.OIOStyles.fontFamily
      }

      return (
         <div className={formStyles.container}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <input
               style={inputStyles}
               className={classNames(classes)}
               id={this.props.id}
               onBlur={this.props.onBlur}
               onChange={this.handleChange}
               name={this.props.name}
               placeholder={this.props.placeholder}
               type={this.props.type}
               value={this.state.value}
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
