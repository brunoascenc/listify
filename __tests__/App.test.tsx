/**
 * @format
 */

import App from '@/App';
import React from 'react';
import { render } from '@testing-library/react-native';

test('renders correctly', () => {
  const { toJSON } = render(<App />);
  expect(toJSON()).toBeTruthy();
});
