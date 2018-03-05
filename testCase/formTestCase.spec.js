import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'
import Form from '../component/ts/page1.tsx'



const wrapper = shallow(<Form />)
describe('title Component', function() {

   it('Check title class', function() {
	expect(wrapper.find('.title').exists()).toEqual(true)
   })

   it('Check title content', function() {
 expect(wrapper.find('.title').text()).toEqual("DR TRACKING SHEET")
  })




})
