import React from 'react';
import Calendar from '../client/components/Calendar.jsx';
import { shallow } from 'enzyme';

describe('should start the next year when clicking next on December', () => {
  it ('renders correctly', () => {
    const wrapper = shallow(<Calendar year={2018} month={11}/>);
    const title = wrapper.find('h3');
    expect(title.text()).toBe('December 2018');    
  });
});