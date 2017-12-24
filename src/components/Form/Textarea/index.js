import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import { createOIOFormField } from '..'
import styles from './styles.less'
import formStyles from '../styles.less'

class Textarea extends Component {
   static propTypes = {
      className: PropTypes.string,
      disabled: PropTypes.bool,
      error: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      onBlur: PropTypes.func,
      placeholder: PropTypes.string,
      readOnly: PropTypes.bool,
      rows: PropTypes.string,
      triggerChange: PropTypes.func,
      triggerValidation: PropTypes.func,
      value: PropTypes.string
   }

   static defaultProps = {
      disabled: false,
      rows: '5'
   }

   static contextTypes = {
      OIOStyles: PropTypes.object
   }

   handleBlur = (event) => {
      this.props.triggerValidation()

      if (this.props.onBlur) {
         this.props.onBlur(event)
      }
   }

   handleChange = (event) => {
      this.props.triggerChange(event, event.target.value)
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
               onBlur={this.handleBlur}
               onChange={this.handleChange}
               name={this.props.name}
               placeholder={this.props.placeholder}
               value={this.props.value}
               readOnly={this.props.readOnly}
               rows={this.props.rows}
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

export default createOIOFormField()(Textarea)
