import { render, userEvent, screen } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import type { TransactionListSortProps } from '../TransactionListSort';
import TransactionListSort from '../TransactionListSort';

import { testIds } from '#/shared/constants/testIds';

const setupComponent = (jsx: React.ReactElement<any>) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};

describe('TransactionListSort', () => {
  const mockOnClose = jest.fn();
  const mockOnSelectSort = jest.fn();

  const defaultProps: TransactionListSortProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSelectSort: mockOnSelectSort,
    selectedSort: { label: 'Nama A-Z', value: 'name-asc' },
  };

  it('should render correctly when open', () => {
    setupComponent(<TransactionListSort {...defaultProps} />);
    expect(screen.getByText('Nama A-Z')).toBeOnTheScreen();
    expect(screen.getByText('Nama Z-A')).toBeOnTheScreen();
    expect(screen.getByText('Tanggal Terbaru')).toBeOnTheScreen();
    expect(screen.getByText('Tanggal Terlama')).toBeOnTheScreen();
  });

  it('should call onClose when backdrop is pressed', async () => {
    const { user } = setupComponent(<TransactionListSort {...defaultProps} />);
    await user.press(screen.getByTestId(testIds.trxListPage.backdrop));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onSelectSort and onClose when a sort option is pressed', async () => {
    const { user } = setupComponent(<TransactionListSort {...defaultProps} />);
    const { getByText } = screen;

    await user.press(getByText('Nama Z-A'));
    expect(mockOnSelectSort).toHaveBeenCalledWith({ label: 'Nama Z-A', value: 'name-desc' });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should display the correct selected sort', () => {
    setupComponent(<TransactionListSort {...defaultProps} />);
    const { getByText } = screen;
    const selectedOption = getByText('Nama A-Z');
    expect(selectedOption).toBeOnTheScreen();
  });
});
