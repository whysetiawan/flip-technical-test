import { render, screen } from '@testing-library/react-native';
import React from 'react';

import TransactionListItemLoading from '../TranscationListItemLoading';

describe('TransactionListItemLoading', () => {
  it('renders correctly', () => {
    render(<TransactionListItemLoading testID="test" />);
    expect(screen.getByTestId('test')).toBeTruthy();
  });
});
