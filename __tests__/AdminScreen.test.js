import 'react-native';
import React from 'react';
import App from '../App';
import AdminScreen from '../Components/AdminScreen';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const snapshot = renderer.create(<AdminScreen />).toJSON();
  expect(snapshot).toMatchSnapshot();
});
