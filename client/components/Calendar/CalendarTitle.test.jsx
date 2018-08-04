import React from 'react';
import { shallow } from 'enzyme';
import CalendarTitle from './CalendarTitle';

describe('CalendarTitle', () => {
  const renderTitleMock = (which) => {
    if (which === 0) {
      return <p id="in">check-in</p>;
    }
    return <p id="out">check-out</p>;
  } 
  it('renders correctly', () => {
    const wrapper = shallow(<CalendarTitle renderTitle={renderTitleMock} icons={{ checkInArrow: '' }} />);
    const checkIn = wrapper.find('#in');
    const checkOut = wrapper.find('#out');
    expect(checkIn.text()).toBe('check-in');
    expect(checkOut.text()).toBe('check-out');
  });
});