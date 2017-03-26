import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './styles.less'
import formStyles from '../styles.less'

import connectToOIOForm from '../connectField'

class Input extends Component {
   static propTypes = {
      className: React.PropTypes.string,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      placeholder: React.PropTypes.string,
      type: React.PropTypes.string,
      readOnly: React.PropTypes.bool,
      triggerChange: React.PropTypes.func,
      triggerValidation: React.PropTypes.func,
      value: React.PropTypes.string
   }

   static defaultProps = {
      type: 'text',
      value: ''
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
               value={this.props.value}
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

export default connectToOIOForm()(Input)
