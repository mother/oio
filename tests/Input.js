/* eslint-disable no-undef */
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16.3'
import React from 'react'
import { expect } from 'chai'
import { spy } from 'sinon'
import Input from '../src/components/Form/Input'
import Form from '../src/components/Form'

Enzyme.configure({ adapter: new Adapter() })

describe('<Input />', () => {
   it('Works with value', () => {
      const handleSubmit = spy()
      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <Input name="firstName" type="text" value="John" />
         </Form>
      )

      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({ firstName: 'John' })
   })

   it('Works with initialValue', () => {
      const handleSubmit = spy()
      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <Input name="firstName" type="text" initialValue="John" />
         </Form>
      )

      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({ firstName: 'John' })
   })

   it('Works when overriding initialValue', () => {
      const handleSubmit = spy()
      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <Input name="firstName" type="text" initialValue="John" />
         </Form>
      )

      wrapper.find('input').simulate('change', { target: { value: 'Jane' } })
      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({ firstName: 'Jane' })
   })
})
