import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import Input from '../Input';

describe('Input Components', () => {
  describe('Outlined', () => {
    it('renders correctly', () => {
      const { getByPlaceholderText } = render(<Input.Outlined placeholder="Test Placeholder" />);
      expect(getByPlaceholderText('Test Placeholder')).toBeTruthy();
    });

    it('handles focus and blur events', () => {
      const { getByPlaceholderText } = render(<Input.Outlined placeholder="Test Placeholder" />);
      const input = getByPlaceholderText('Test Placeholder');

      fireEvent(input, 'focus');
      expect(input.parent.props.className).toContain('border-primary');

      fireEvent(input, 'blur');
      expect(input.parent.props.className).not.toContain('border-primary');
    });

    it('renders prefix and suffix', () => {
      const { getByText } = render(
        <Input.Outlined prefix={<Text>Prefix</Text>} suffix={<Text>Suffix</Text>} />,
      );
      expect(getByText('Prefix')).toBeTruthy();
      expect(getByText('Suffix')).toBeTruthy();
    });
  });

  describe('Underlined', () => {
    it('renders correctly', () => {
      const { getByPlaceholderText } = render(<Input.Underlined placeholder="Test Placeholder" />);
      expect(getByPlaceholderText('Test Placeholder')).toBeTruthy();
    });

    it('handles focus and blur events', () => {
      const { getByPlaceholderText } = render(<Input.Underlined placeholder="Test Placeholder" />);
      const input = getByPlaceholderText('Test Placeholder');

      fireEvent(input, 'focus');
      expect(input.parent.props.className).toContain('border-primary');

      fireEvent(input, 'blur');
      expect(input.parent.props.className).not.toContain('border-primary');
    });

    it('renders prefix and suffix', () => {
      const { getByText } = render(
        <Input.Underlined prefix={<Text>Prefix</Text>} suffix={<Text>Suffix</Text>} />,
      );
      expect(getByText('Prefix')).toBeTruthy();
      expect(getByText('Suffix')).toBeTruthy();
    });
  });
});
