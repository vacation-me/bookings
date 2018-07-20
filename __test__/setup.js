// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('1 + 2 should equal 3', () => {
  expect(1 + 2).toBe(3);
});