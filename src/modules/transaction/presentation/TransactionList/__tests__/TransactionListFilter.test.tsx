import { render, userEvent, screen } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import type { TransactionListFilterProps } from '../TransactionListFilter';
import TransactionListFilter from '../TransactionListFilter';

import { testIds } from '#/shared/constants/testIds';

const setupComponent = (jsx: React.ReactElement<any>) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};

describe('TransactionListFilter', () => {
  const mockOnClose = jest.fn();
  const mockOnSelectFilter = jest.fn();

  const defaultProps: TransactionListFilterProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSelectFilter: mockOnSelectFilter,
    selectedFilter: { label: 'Nama A-Z', value: 'name-asc' },
  };

  it('should render correctly when open', () => {
    setupComponent(<TransactionListFilter {...defaultProps} />);
    expect(screen.getByText('Nama A-Z')).toBeOnTheScreen();
    expect(screen.getByText('Nama Z-A')).toBeOnTheScreen();
    expect(screen.getByText('Tanggal Terbaru')).toBeOnTheScreen();
    expect(screen.getByText('Tanggal Terlama')).toBeOnTheScreen();
  });

  it('should call onClose when backdrop is pressed', async () => {
    const { user } = setupComponent(<TransactionListFilter {...defaultProps} />);
    await user.press(screen.getByTestId(testIds.trxListPage.backdrop));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onSelectFilter and onClose when a filter option is pressed', async () => {
    const { user } = setupComponent(<TransactionListFilter {...defaultProps} />);
    const { getByText } = screen;

    await user.press(getByText('Nama Z-A'));
    expect(mockOnSelectFilter).toHaveBeenCalledWith({ label: 'Nama Z-A', value: 'name-desc' });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should display the correct selected filter', () => {
    setupComponent(<TransactionListFilter {...defaultProps} />);
    const { getByText } = screen;
    const selectedOption = getByText('Nama A-Z');
    expect(selectedOption).toBeOnTheScreen();
  });
});
