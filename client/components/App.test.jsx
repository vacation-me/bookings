import React from 'react';
import { shallow, mount } from 'enzyme';
import sampleData from '../../__test__/config/sampleData';
import App from './App';

describe('App component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<App />, { disableLifecycleMethods: true });
    const title = wrapper.find('p').first();
    expect(title.text()).toBe('$0 per night');
  });

  it('renders live data correctly', () => {
    const wrapper = mount(<App {...sampleData} />);
    const title = wrapper.find('p').first();
    expect(title.text()).toBe('$314 per night');
  });

  it('displays calendar when check-in button is clicked', () => {
    const year = new Date().getFullYear().toString();
    const wrapper = mount(<App {...sampleData} />);
    wrapper.find('#check-in').simulate('click');
    const calendar = wrapper.find('#calendar-title');
    expect(calendar.text()).toContain(year);
  });

  it('should toggle years on calendar correctly ', () => {
    const wrapper = mount(<App {...sampleData} />);
    wrapper.find('#check-in').simulate('click');
    wrapper.setState({ month: 11, year: 2018 });
    expect(wrapper.find('#calendar-title').text()).toBe('December 2018');
    wrapper.find('#next-month').simulate('click');
    expect(wrapper.find('#calendar-title').text()).toBe('January 2019');
    wrapper.find('#prev-month').simulate('click');
    expect(wrapper.find('#calendar-title').text()).toBe('December 2018');
  });

  it('displays guest component when guest button is clicked', () => {
    const wrapper = mount(<App {...sampleData} />);
    wrapper.find('#toggle-guest-view').simulate('click');
    const calendar = wrapper.find('#adult-guest-toggle').length;
    expect(calendar).toBe(1);
  });

  it('should toggle guests correctly', () => {
    const wrapper = mount(<App {...sampleData} />);
    wrapper.find('#toggle-guest-view').simulate('click');
    wrapper.find('#guest-btn-1').simulate('click');
    expect(wrapper.find('.guest-count').first().text()).toBe('2');
    wrapper.find('#guest-btn-5').simulate('click');
    wrapper.find('#guest-btn-5').simulate('click');
    expect(wrapper.find('.guest-count').last().text()).toBe('2');
  });

  it('renders pricing view after check in and check-out have been selected', () => {
    const wrapper = mount(<App {...sampleData} />);
    wrapper.find('#check-in').simulate('click');
    wrapper.find('.avail').first().simulate('click');
    wrapper.find('.avail').first().simulate('click');
    const pricing = wrapper.find('.booking-info');
    expect(pricing.text()).toContain('Service Fee');
  });

  it('displays pop ups when info buttons are selected', () => {
    const wrapper = mount(<App {...sampleData} />);
    wrapper.find('#check-in').simulate('click');
    wrapper.find('.avail').first().simulate('click');
    wrapper.find('.avail').first().simulate('click');
    wrapper.find('img.small-icon').first().simulate('click');

    const popUp = wrapper.find('#pop-up-text');
    expect(popUp.text()).toBe('One-time fee charged by host to cover the cost of cleaning their space.');
    wrapper.find('.close-btn').simulate('click');
    expect(wrapper.find('#pop-up-text').length).toBe(0);
  });
});
