import React from 'react';
import { shallow, render, mount, } from 'enzyme';
import sampleData from '../../__test__/config/sampleData';
import App from './App';

describe('App component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<App />, { disableLifecycleMethods: true });
    const title = wrapper.find('h3').first();
    expect(title.text()).toBe('$0 per night');
  });

  it('renders live data correctly', () => {
    const wrapper = mount(<App {...sampleData} />);
    const title = wrapper.find('h3').first();
    expect(title.text()).toBe('$314 per night');
  });
});
