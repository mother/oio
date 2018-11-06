/* eslint-disable no-undef */
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16.3'
import React from 'react'
import { expect } from 'chai'
import { spy } from 'sinon'
import Select from '../src/components/Form/Select'
import Form from '../src/components/Form'

Enzyme.configure({ adapter: new Adapter() })

describe('<Input />', () => {
   it('No options yields nothing', () => {
      const handleSubmit = spy()
      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <Select name="colours" />
         </Form>
      )

      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({})
   })

   it('Uses first option if no value or initialValue is specified', () => {
      const handleSubmit = spy()
      const options = [
         { value: 'green', text: 'Green' },
         { value: 'red', text: 'Red' }
      ]

      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <Select name="colour" options={options} />
         </Form>
      )

      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({ colour: 'green' })
   })

   it('Works with value', () => {
      const handleSubmit = spy()
      const options = [
         { value: 'green', text: 'Green' },
         { value: 'red', text: 'Red' }
      ]

      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <Select name="colour" options={options} value="red" />
         </Form>
      )

      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({ colour: 'red' })
   })

   it('Works with initialValue', () => {
      const handleSubmit = spy()
      const options = [
         { value: 'green', text: 'Green' },
         { value: 'red', text: 'Red' }
      ]

      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <Select name="colour" options={options} initialValue="red" />
         </Form>
      )

      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({ colour: 'red' })
   })

   it('Works with initialValue asynchronously', async () => {
      const handleSubmit = spy()
      const options = [
         { value: 'green', text: 'Green' },
         { value: 'red', text: 'Red' }
      ]

      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <Select name="colour" options={options} initialValue={undefined} />
         </Form>
      )

      await new Promise(resolve => setTimeout(resolve, 100))

      // Kinda hacky
      wrapper.setProps({
         children: React.cloneElement(wrapper.props().children, { initialValue: 'red' })
      })

      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({ colour: 'red' })
   })

   it('Works when overriding initialValue', () => {
      const handleSubmit = spy()
      const options = [
         { value: 'green', text: 'Green' },
         { value: 'red', text: 'Red' }
      ]

      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <Select name="colour" options={options} initialValue="red" />
         </Form>
      )

      wrapper.find('select').simulate('change', { target: { value: 'green' } })
      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({ colour: 'green' })
   })
})
