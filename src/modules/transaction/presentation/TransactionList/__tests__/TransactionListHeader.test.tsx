import { render, userEvent, screen } from '@testing-library/react-native';
import React from 'react';

import '@testing-library/jest-native/extend-expect';
import TransactionListHeader from '../TransactionListHeader';

import { testIds } from '#/shared/constants/testIds';

const setupComponent = (jsx: React.ReactElement<any>) => {
  return {
    ...render(jsx),
    user: userEvent.setup(),
  };
};

describe('TransactionListHeader', () => {
  it('should call onSearchChange when text changes', async () => {
    const onSearchChangeMock = jest.fn();
    const { user } = setupComponent(
      <TransactionListHeader onSearchChange={onSearchChangeMock} onFilterPress={jest.fn()} />,
    );

    const { getByTestId } = screen;

    const searchInput = getByTestId(testIds.trxListPage.searchInput);
    await user.type(searchInput, 'test search');

    expect(onSearchChangeMock).toHaveBeenCalledWith('test search');
  });

  it('should call onFilterPress when filter button is pressed', async () => {
    const onFilterPressMock = jest.fn();
    const { user } = setupComponent(
      <TransactionListHeader onSearchChange={jest.fn()} onFilterPress={onFilterPressMock} />,
    );

    const { getByTestId } = screen;

    const filterButton = getByTestId(testIds.trxListPage.filterButton);
    await user.press(filterButton);

    expect(onFilterPressMock).toHaveBeenCalled();
  });

  it('should display the correct labelFilter text', () => {
    const labelFilter = 'Filter Label';
    const { getByText } = setupComponent(
      <TransactionListHeader
        onSearchChange={jest.fn()}
        onFilterPress={jest.fn()}
        labelFilter={labelFilter}
      />,
    );

    expect(getByText(labelFilter)).toBeTruthy();
  });
});
