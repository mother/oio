/* eslint-disable no-undef */
import PropTypes from 'prop-types'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16.3'
import React from 'react'
import { expect } from 'chai'
import { spy } from 'sinon'
import RadioGroup from '../src/components/Form/RadioGroup'
import Radio from '../src/components/Form/Radio'
import Form from '../src/components/Form'
import oioStyles from '../src/components/OIO/defaults'

const options = {
   context: { OIOStyles: oioStyles },
   childContextTypes: { OIOStyles: PropTypes.object }
}

Enzyme.configure({ adapter: new Adapter() })

describe('<RadioGroup />', () => {
   it('Unselected yields nothing', () => {
      const handleSubmit = spy()
      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <RadioGroup name="colour">
               <Radio value="green" label="Green" />
               <Radio value="red" label="Red" />
            </RadioGroup>
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
            <RadioGroup name="colour" value="red">
               <Radio value="green" label="Green" />
               <Radio value="red" label="Red" />
            </RadioGroup>
         </Form>,
         options
      )

      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({ colour: 'red' })
   })

   it('Works with initialValue', () => {
      const handleSubmit = spy()
      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <RadioGroup name="colour" initialValue="green">
               <Radio value="green" label="Green" />
               <Radio value="red" label="Red" />
            </RadioGroup>
         </Form>,
         options
      )

      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({ colour: 'green' })
   })

   it('Works with initialValue asynchronously', async () => {
      const handleSubmit = spy()
      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <RadioGroup name="colour">
               <Radio value="green" label="Green" />
               <Radio value="red" label="Red" />
            </RadioGroup>
         </Form>,
         options
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
      const wrapper = mount(
         <Form onSubmit={handleSubmit}>
            <RadioGroup name="colour" initialValue="red">
               <Radio value="green" label="Green" />
               <Radio value="red" label="Red" />
            </RadioGroup>
         </Form>,
         options
      )

      wrapper.find('input[value="green"]').simulate('change', {
         target: { checked: true, value: 'green' }
      })

      wrapper.find('form').simulate('submit')
      const formData = handleSubmit.getCall(0).args[0]
      expect(formData).to.deep.equal({ colour: 'green' })
   })
})
