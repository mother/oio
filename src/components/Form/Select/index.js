/* eslint-disable react/require-default-props */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import { withFormContext } from '..'
import styles from './styles.less'
import formStyles from '../styles.less'

class Select extends Component {
   static propTypes = {
      className: PropTypes.string,
      error: PropTypes.string,
      id: PropTypes.string,
      initialValue: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string.isRequired,
      oioFormContext: PropTypes.object.isRequired,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      options: PropTypes.array,
      readOnly: PropTypes.bool,
      value: PropTypes.string
   }

   static defaultProps = {
      options: []
   }

   constructor(props) {
      super(props)
      this.state = {
         value: props.initialValue || ''
      }
   }

   componentDidMount() {
      if (this.props.initialValue) {
         this.props.oioFormContext.setInitialValue(this.props.name, this.props.initialValue)
      } else if (this.props.value) {
         this.props.oioFormContext.setInitialValue(this.props.name, this.props.value)
      } else if (Array.isArray(this.props.options) && this.props.options.length) {
         this.props.oioFormContext.setInitialValue(this.props.name, this.props.options[0].value)
      }
   }

   componentWillReceiveProps(nextProps) {
      if (typeof nextProps.value !== 'undefined' && this.props.value !== nextProps.value) {
         this.props.oioFormContext.setValue(this.props.name, nextProps.value)
         this.setState({ value: nextProps.value })
      }
   }

   handleBlur = (event) => {
      if (this.props.onBlur) {
         this.props.onBlur(event)
      }
   }

   handleChange = (event) => {
      if (typeof this.props.value === 'undefined') {
         this.props.oioFormContext.setValue(this.props.name, event.target.value)
         this.setState({ value: event.target.value })
      }

      if (this.props.onChange) {
         this.props.onChange(event, event.target.value)
      }
   }

   render() {
      const classes = [styles.select, this.props.className]
      const options = this.props.options.map(option => (
         <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}>
            {option.text}
         </option>
      ))

      return (
         <div className={formStyles.container}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <select
               className={classNames(classes)}
               id={this.props.id}
               value={typeof this.props.value !== 'undefined' ? this.props.value : this.state.value}
               name={this.props.name}
               onChange={this.handleChange}
               readOnly={this.props.readOnly}>
               {options}
            </select>
            {this.props.error &&
               <div className={formStyles.error}>
                  {this.props.error}
               </div>
            }
         </div>
      )
   }
}

export default withFormContext(Select)
