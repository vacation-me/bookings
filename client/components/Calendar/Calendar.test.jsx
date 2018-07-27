import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';
import { doesNotReject } from 'assert';

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
};

describe('Calendar Component', () => {
  const wrapper = shallow(<Calendar {...mockProps} />);

  it('renders correctly', () => {
    const title = wrapper.find('h3');
    expect(title.text()).toBe('December 2018');
  });
});
