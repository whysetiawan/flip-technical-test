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
      <TransactionListHeader onSearchChange={onSearchChangeMock} onSortPress={jest.fn()} />,
    );

    const { getByTestId } = screen;

    const searchInput = getByTestId(testIds.trxListPage.searchInput);
    await user.type(searchInput, 'test search');

    expect(onSearchChangeMock).toHaveBeenCalledWith('test search');
  });

  it('should call onSort when sort button is pressed', async () => {
    const onSortMock = jest.fn();
    const { user } = setupComponent(
      <TransactionListHeader onSearchChange={jest.fn()} onSortPress={onSortMock} />,
    );

    const { getByTestId } = screen;

    const sortButton = getByTestId(testIds.trxListPage.sortButton);
    await user.press(sortButton);

    expect(onSortMock).toHaveBeenCalled();
  });

  it('should display the correct sortByLabel text', () => {
    const sortByLabel = 'URUTKAN';
    const { getByText } = setupComponent(
      <TransactionListHeader
        onSearchChange={jest.fn()}
        onSortPress={jest.fn()}
        sortByLabel={sortByLabel}
      />,
    );

    expect(getByText(sortByLabel)).toBeTruthy();
  });
});
