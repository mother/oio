import React, { Component } from 'react'
import classNames from 'classnames'
import { createOIOFormField } from '..'
import styles from './styles.less'
import formStyles from '../styles.less'

class Textarea extends Component {
   static propTypes = {
      className: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      placeholder: React.PropTypes.string,
      readOnly: React.PropTypes.bool,
      rows: React.PropTypes.string,
      triggerChange: React.PropTypes.func,
      triggerValidation: React.PropTypes.func,
      value: React.PropTypes.string
   }

   static defaultProps = {
      disabled: false,
      rows: '5'
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
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
