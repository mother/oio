import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import { createOIOFormField } from '..'
import styles from './styles.less'
import formStyles from '../styles.less'

class Select extends Component {
   static propTypes = {
      className: PropTypes.string,
      error: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      onBlur: PropTypes.func,
      options: PropTypes.array,
      readOnly: PropTypes.bool,
      triggerChange: PropTypes.func,
      triggerValidation: PropTypes.func,
      value: PropTypes.string
   }

   static defaultProps = {
      options: []
   }

   componentDidMount() {
      if (!this.props.value && this.props.options.length) {
         this.props.triggerChange(null, this.props.options[0].value)
      }
   }

   handleBlur = (event) => {
      this.props.triggerValidation()

      if (this.props.onBlur) {
         this.props.onBlur(event)
      }
   }

   handleChange = (event) => {
      this.props.triggerChange(event, event.target.value, () => {
         this.props.triggerValidation()
      })
   }

   render() {
      const classes = [styles.select, this.props.className]

      const children = []
      this.props.options.forEach((option) => {
         children.push(
            <option
               key={option.value}
               value={option.value}
               disabled={option.disabled}>
               {option.text}
            </option>
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
               onChange={this.handleChange}
               readOnly={this.props.readOnly}>
               {children}
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

export default createOIOFormField()(Select)
