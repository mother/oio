import React, { Component } from 'react'

const createOIOFormField = () => Field => (
   class ConnectedField extends Component {
      static propTypes = {
         initialValue: React.PropTypes.string,
         name: React.PropTypes.string,
         onChange: React.PropTypes.func,
         readOnly: React.PropTypes.bool,
         rules: React.PropTypes.array,
         value: React.PropTypes.string
      }

      static contextTypes = {
         OIOForm: React.PropTypes.object
      }

      constructor(props) {
         super(props)

         this.initialized = props.value || props.initialValue
         this.state = {
            value: props.value || props.initialValue
         }
      }

      componentDidMount() {
         if (this.context.OIOForm && this.props.name) {
            this.context.OIOForm.setInitialValue(this.props.name, this.state.value)
            this.context.OIOForm.setRules(this.props.name, this.props.rules)
         }
      }

      componentWillReceiveProps(nextProps) {
         // TODO: If name changes, need to remove form value corresponding to old name

         let nextValue

         // If a value is provided
         if (nextProps.value && this.props.value !== nextProps.value) {
            this.initialized = true
            nextValue = nextProps.value

         // If the field is not initialized, and an initialValue is provided
         } else if (nextProps.initialValue && !this.initialized) {
            this.initialized = true
            nextValue = nextProps.initialValue
         }

         if (nextValue) {
            this.setState({ value: nextValue })
            if (this.context.OIOForm) {
               this.context.OIOForm.setValue(this.props.name, nextValue)
            }

            if (this.context.OIOForm) {
               this.setState({
                  error: this.context.OIOForm.getErrors().errors[this.props.name]
               })
            }
         }
      }

      triggerValidation = () => {
         if (this.context.OIOForm) {
            const error = this.context.OIOForm.validateValue(
               this.props.name,
               this.state.value,
               this.props.rules
            )

            this.setState({ error })
         }
      }

      triggerChange = (event, value) => {
         // Only update the state (and therefore the value) if both
         // props.value and props.onChange are not specified
         const shouldUpdateState = !(this.props.value && this.props.onChange)

         if (shouldUpdateState) {
            this.setState({ value })

            if (this.context.OIOForm) {
               this.context.OIOForm.setValue(this.props.name, value)
            }
         }

         if (this.props.onChange) {
            this.props.onChange(event, value)
         }
      }

      render() {
         const readOnly = this.props.readOnly || (this.props.value && !this.props.onChange)

         return (
            <Field
               {...this.props}
               error={this.state.error}
               onChange={undefined}
               readOnly={readOnly}
               triggerChange={this.triggerChange}
               triggerValidation={this.triggerValidation}
               value={this.state.value}
            />
         )
      }
   }
)

export default createOIOFormField
