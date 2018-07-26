/* eslint-disable react/require-default-props */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import { withFormContext } from '..'
import styles from './styles.less'
import formStyles from '../styles.less'

class Input extends Component {
   static propTypes = {
      className: PropTypes.string,
      error: PropTypes.string,
      id: PropTypes.string,
      initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      label: PropTypes.string,
      name: PropTypes.string.isRequired,
      oioFormContext: PropTypes.object.isRequired,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      placeholder: PropTypes.string,
      type: PropTypes.string,
      readOnly: PropTypes.bool,
      value: PropTypes.string
   }

   static defaultProps = {
      type: 'text'
   }

   // TODO: Deprecate
   static contextTypes = {
      OIOStyles: PropTypes.object
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
               onBlur={this.handleBlur}
               onChange={this.handleChange}
               name={this.props.name}
               placeholder={this.props.placeholder}
               readOnly={this.props.readOnly}
               type={this.props.type}
               value={typeof this.props.value !== 'undefined' ? this.props.value : this.state.value}
            />
            {this.props.error &&
               <div className={formStyles.error}>
                  {this.props.error}
               </div>
            }
         </div>
      )
   }
}

export default withFormContext(Input)
