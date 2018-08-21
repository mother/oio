import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Blob from 'blob'
import FormData from 'form-data'

const FormContext = React.createContext('oioForm')

export const withFormContext = WrappedComponent => props => (
   <FormContext.Consumer>
      {context => <WrappedComponent {...props} oioFormContext={context} />}
   </FormContext.Consumer>
)

export { FormContext }
export { default as createOIOFormField } from './createField'

export default class Form extends Component {
   static propTypes = {
      children: PropTypes.node.isRequired,
      onError: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
      onSubmit: PropTypes.func
   }

   static defaultProps = {
      onError: () => {},
      onSubmit: () => {}
   }

   constructor(props) {
      super(props)

      this.initialValues = {}
      this.data = {}
      this.errors = {}
      this.state = {
         pristine: true,
         submitting: false
      }
   }

   setInitialValue = (name, value) => {
      console.log('SET INITIAL VALUE', name, value) // eslint-disable-line no-console

      this.initialValues[name] = {
         ...this.initialValues[name],
         value
      }

      this.data[name] = {
         ...this.data[name],
         value
      }
   }

   setValue = (name, value, callback = () => {}) => {
      console.log('SET VALUE', name, value) // eslint-disable-line no-console

      this.data[name] = {
         ...this.data[name],
         value
      }

      if (this.state.pristine) {
         this.setState({ pristine: false })
      }
   }

   constructFormData = (data, files) => {
      const formData = new FormData()

      Object.keys(data).forEach(key => formData.append(key, data[key]))
      Object.keys(files).forEach((key) => {
         const file = files[key]
         formData.append(key, new Blob([file], { type: file.type }), file.name || 'file')
      })

      return formData
   }

   reinitializeFormState = () => {
      this.setState({
         pristine: true,
         submitting: false
      })

      // this.setState((state) => {
      //    const fieldNames = Object.keys(state.data)
      //    const newData = Object.assign({}, fieldNames.reduce((newState, key) => {
      //       newState[key] = {
      //          ...state.data[key],
      //          initialValue: state.data[key].value
      //       }
      //
      //       return newState
      //    }, {}))
      //
      //    return {
      //       data: newData,
      //       pristine: true,
      //       submitting: false
      //    }
      // })
   }

   handleSubmit = (event) => {
      event.preventDefault()

      const data = {}
      const files = {}

      Object.keys(this.data).forEach((fieldName) => {
         const value = this.data[fieldName].value
         if (value instanceof window.File) {
            files[fieldName] = value
         } else {
            data[fieldName] = value
         }
      })

      if (this.props.onSubmit) {
         const formData = this.constructFormData(data, files)
         const submitPromise = this.props.onSubmit(data, files, formData, {
            constructFormData: this.constructFormData,
            reinitializeFormState: this.reinitializeFormState
         })

         // We check if the reference to the form element is
         // defined before attempting to modify this component's state,
         // since the component may be unmounted by the time submitPromise
         // is fulfilled/rejected
         if (submitPromise instanceof Promise) {
            this.setState({ submitting: true }, () => {
               submitPromise
               .then(() => {
                  if (this.formElement) {
                     this.reinitializeFormState()
                  }
               })
               .catch(() => {
                  if (this.formElement) {
                     this.setState({ submitting: false })
                  }
               })
            })
         }
      }
   }

   // =======================================================
   // Render
   // =======================================================

   render() {
      return (
         <form onSubmit={this.handleSubmit} ref={(ref) => { this.formElement = ref }}>
            <FormContext.Provider value={{
               setInitialValue: this.setInitialValue,
               setRules: this.setRules,
               setValue: this.setValue,
               pristine: this.state.pristine,
               submitting: this.state.submitting
            }}>
               {this.props.children}
            </FormContext.Provider>
         </form>
      )
   }
}
