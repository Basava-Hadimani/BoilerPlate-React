import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'
import Head from '../component/ts/head.tsx'



const wrapper = shallow(<Head />)
describe('Header Component', function() {

   it('Check div with header id', function() {
	expect(wrapper.find('#head').exists()).toEqual(true)
   })

    it('Check row class', function() {
	expect(wrapper.find('.row').exists()).toEqual(true)
   })

   it('Check logo class', function() {
expect(wrapper.find('.logo').exists()).toEqual(true)
  })



})
