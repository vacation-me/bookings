import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

const mockProps = {
  year: 2018,
  month: 11,
  availableDates: [
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
    [5, 5],
    [6, 5],
    [7, 5],
    [8, 5],
    [9, 5],
    [10, 5],
    [11, 5],
    [12, 5],
  ],
  requestedDates: [],
  minStay: 5,
  icons: {
    rightArrow: '',
    leftArrow: '',
    checkInArrow: '',
  },
};

describe('Calendar Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Calendar {...mockProps} />);
    const title = wrapper.find('#calendar-title > p');
    expect(title.text()).toBe('December 2018');
  });

  it('renders correctly when selecting checkout', () => {
    mockProps.requestedDates.push(new Date(2018, 11, 1));
    const wrapper = shallow(<Calendar {...mockProps} />);
    const firstAvail = wrapper.find('.avail').first();
    expect(firstAvail.text()).toBe('6');
  });

  it('renders correctly after checkout was selected', () => {
    mockProps.requestedDates.push(new Date(2018, 11, 6));
    const wrapper = shallow(<Calendar {...mockProps} />);
    const firstRange = wrapper.find('.range').first();
    expect(firstRange.text()).toBe('2');
  });
});
