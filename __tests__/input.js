import PropTypes from 'prop-types'
import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { Form, Input } from '../src'

const renderForm = node => render(<Form>{node}</Form>)

class ErrorBoundary extends React.Component {
   state = { errorMsg: '' }

   static propTypes = {
      children: PropTypes.node.isRequired
   }

   componentDidCatch(error, info) {
      this.setState({ errorMsg: error.message })
   }

   render() {
      return this.state.errorMsg !== ''
         ? <div>{this.state.errorMsg}</div>
         : this.props.children
   }
}

beforeEach(() => {
   jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
   jest.restoreAllMocks()
})

test('sets the initial value to be an empty string by default', () => {
   const setInitialValueSpy = jest.spyOn(Form.prototype, 'setInitialValue')
   const setValueSpy = jest.spyOn(Form.prototype, 'setValue')
   const { getByLabelText } = renderForm(
      <Input type="text" label="First Name" name="firstName" />
   )

   const inputNode = getByLabelText(/first name/i)
   expect(inputNode.value).toBe('')

   expect(setInitialValueSpy).toHaveBeenCalledTimes(1)
   expect(setInitialValueSpy).lastCalledWith('firstName', '')
   expect(setValueSpy).toHaveBeenCalledTimes(0)
})

test('setting initialValue prop sets the initial value', () => {
   const setInitialValueSpy = jest.spyOn(Form.prototype, 'setInitialValue')
   const setValueSpy = jest.spyOn(Form.prototype, 'setValue')
   const { getByLabelText } = renderForm(
      <Input type="text" name="firstName" label="First Name" initialValue="John" />
   )

   const inputNode = getByLabelText(/first name/i)
   expect(inputNode.value).toBe('John')

   expect(setInitialValueSpy).toHaveBeenCalledTimes(1)
   expect(setInitialValueSpy).lastCalledWith('firstName', 'John')
   expect(setValueSpy).toHaveBeenCalledTimes(0)
})

test('setting initialValue prop asynchronly sets the initial value', async () => {
   const setInitialValueSpy = jest.spyOn(Form.prototype, 'setInitialValue')
   const setValueSpy = jest.spyOn(Form.prototype, 'setValue')
   const { getByLabelText, rerender } = renderForm(
      <Input type="text" label="First Name" name="firstName" />
   )

   const inputNode = getByLabelText(/first name/i)
   expect(inputNode.value).toBe('')

   expect(setInitialValueSpy).toHaveBeenCalledTimes(1)
   expect(setInitialValueSpy).lastCalledWith('firstName', '')
   expect(setValueSpy).toHaveBeenCalledTimes(0)

   await new Promise(resolve => setTimeout(resolve, 100))
   rerender(
      <Form>
         <Input name="firstName" type="text" label="First Name" initialValue="Bohn" />
      </Form>
   )

   expect(inputNode.value).toBe('Bohn')
   expect(setInitialValueSpy).toHaveBeenCalledTimes(2)
   expect(setInitialValueSpy).lastCalledWith('firstName', 'Bohn')
   expect(setValueSpy).toHaveBeenCalledTimes(0)
})

test('setting value prop sets the value', async () => {
   const setInitialValueSpy = jest.spyOn(Form.prototype, 'setInitialValue')
   const setValueSpy = jest.spyOn(Form.prototype, 'setValue')
   const { container, rerender } = renderForm(<Input type="text" name="firstName" value="Joan" />)

   const input = container.querySelector('input')
   expect(input.value).toBe('Joan')
   expect(setValueSpy).toHaveBeenCalledTimes(1)
   expect(setValueSpy).lastCalledWith('firstName', 'Joan')
   expect(setInitialValueSpy).toHaveBeenCalledTimes(0)

   await new Promise(resolve => setTimeout(resolve, 100))
   rerender(
      <Form>
         <Input type="text" label="First Name" name="firstName" value="Yohn" />
      </Form>
   )

   expect(input.value).toBe('Yohn')
   expect(setValueSpy).toHaveBeenCalledTimes(2)
   expect(setValueSpy).lastCalledWith('firstName', 'Yohn')
   expect(setInitialValueSpy).toHaveBeenCalledTimes(0)
})

test('setting initialValue prop then overriding the value', async () => {
   const setInitialValueSpy = jest.spyOn(Form.prototype, 'setInitialValue')
   const setValueSpy = jest.spyOn(Form.prototype, 'setValue')
   const { container } = renderForm(<Input type="text" name="firstName" initialValue="John" />)

   await new Promise(resolve => setTimeout(resolve, 100))
   const input = container.querySelector('input')
   fireEvent.change(input, { target: { value: 'Suzie' } })

   expect(setInitialValueSpy).toHaveBeenCalledTimes(1)
   expect(setInitialValueSpy).lastCalledWith('firstName', 'John')
   expect(setValueSpy).toHaveBeenCalledTimes(1)
   expect(setValueSpy).lastCalledWith('firstName', 'Suzie')
})

test('initialValue and value props cannot both be present', async () => {
   const setInitialValueSpy = jest.spyOn(Form.prototype, 'setInitialValue')
   const setValueSpy = jest.spyOn(Form.prototype, 'setValue')
   const { container } = renderForm(
      <ErrorBoundary>
         <Input type="text" name="firstName" initialValue="John" value="Pizza" />
      </ErrorBoundary>
   )

   expect(container.textContent).toEqual(expect.stringContaining('must be either controlled or uncontrolled'))
   expect(setInitialValueSpy).toHaveBeenCalledTimes(0)
   expect(setValueSpy).toHaveBeenCalledTimes(0)

   // Called once by React and once by js dom
   expect(console.error).toHaveBeenCalledTimes(2)
})

test('Cannot override value of a controlled field', async () => {
   const setInitialValueSpy = jest.spyOn(Form.prototype, 'setInitialValue')
   const setValueSpy = jest.spyOn(Form.prototype, 'setValue')
   const { container } = renderForm(
      <ErrorBoundary>
         <Input type="text" name="firstName" value="Shoo" />
      </ErrorBoundary>
   )

   await new Promise(resolve => setTimeout(resolve, 100))
   const input = container.querySelector('input')
   fireEvent.change(input, { target: { value: 'John' } })

   expect(input.value).toBe('Shoo')
   expect(setInitialValueSpy).toHaveBeenCalledTimes(0)
   expect(setValueSpy).toHaveBeenCalledTimes(1)
   expect(console.error).toHaveBeenCalledTimes(0)
})
