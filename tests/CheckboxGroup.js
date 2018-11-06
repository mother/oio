/* eslint-disable no-undef */
import PropTypes from 'prop-types'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16.3'
import React from 'react'
import { expect } from 'chai'
import { spy } from 'sinon'
import CheckboxGroup from '../src/components/Form/CheckboxGroup'
import Checkbox from '../src/components/Form/Checkbox'
import Form from '../src/components/Form'
import oioStyles from '../src/components/OIO/defaults'

const options = {
   context: { OIOStyles: oioStyles },
   childContextTypes: { OIOStyles: PropTypes.object }
}

Enzyme.configure({ adapter: new Adapter() })

describe('<CheckboxGroup />', () => {
   it('Unselected yields nothing', () => {
      const handleSubmit = spy()
      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <CheckboxGroup name="colours">
               <Checkbox value="green" label="Green" />
               <Checkbox value="red" label="Red" />
            </CheckboxGroup>
         </Form>,
         options
      )

      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({})
   })

   it('Works with value', () => {
      const handleSubmit = spy()
      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <CheckboxGroup name="colours" value={['red', 'green']}>
               <Checkbox value="green" label="Green" />
               <Checkbox value="red" label="Red" />
            </CheckboxGroup>
         </Form>,
         options
      )

      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({ colours: ['red', 'green'] })
   })

   it('Works with initialValue', () => {
      const handleSubmit = spy()
      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <CheckboxGroup name="colours" initialValue={['green']}>
               <Checkbox value="green" label="Green" />
               <Checkbox value="red" label="Red" />
            </CheckboxGroup>
         </Form>,
         options
      )

      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({ colours: ['green'] })
   })

   it('Works with initialValue asynchronously', async () => {
      const handleSubmit = spy()
      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <CheckboxGroup name="colours">
               <Checkbox value="green" label="Green" />
               <Checkbox value="red" label="Red" />
            </CheckboxGroup>
         </Form>,
         options
      )

      await new Promise(resolve => setTimeout(resolve, 100))

      // Kinda hacky
      wrapper.setProps({
         children: React.cloneElement(wrapper.props().children, { initialValue: ['red'] })
      })

      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({ colours: ['red'] })
   })

   it('Works when overriding initialValue', () => {
      const handleSubmit = spy()
      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <CheckboxGroup name="colours" initialValue={['red']}>
               <Checkbox value="green" label="Green" />
               <Checkbox value="red" label="Red" />
            </CheckboxGroup>
         </Form>,
         options
      )

      wrapper.find('input[value="green"]').simulate('change', {
         target: { checked: true, value: 'green' }
      })

      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({ colours: ['red', 'green'] })
   })
})
