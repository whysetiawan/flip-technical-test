import { render, screen, userEvent } from '@testing-library/react-native';
import { useRouter } from 'expo-router';

import TransactionListItem from '../TransactionListItem';

import type { Transaction } from '#/modules/transaction/domain/entities/transaction';
import { testIds } from '#/shared/constants/testIds';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

const setupComponent = (jsx: React.ReactElement<any>) => {
  const utils = render(jsx);
  const user = userEvent.setup();
  return { ...utils, user };
};

describe('TransactionListItem', () => {
  const mockTransaction: Transaction = {
    id: '1',
    senderBank: 'Bank A',
    beneficiaryBank: 'Bank B',
    beneficiaryName: 'John Doe',
    amount: 1000,
    createdAt: '2023-10-01T00:00:00Z',
    status: 'PENDING',
    accountNumber: '',
    completedAt: '',
    fee: 0,
    remark: '',
    uniqueCode: 0,
  };

  const component = <TransactionListItem transaction={mockTransaction} />;

  it('should render transaction details correctly', () => {
    setupComponent(component);
    const { getByText } = screen;

    expect(getByText(/Bank A/i)).toBeOnTheScreen();
    expect(getByText(/Bank B/i)).toBeOnTheScreen();
    expect(getByText(/John Doe/i)).toBeOnTheScreen();
    expect(getByText(/1.000/i)).toBeOnTheScreen();
    expect(getByText(/Pengecekan/i)).toBeOnTheScreen();
  });

  it('should navigate to transaction details on press', async () => {
    const navigate = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ navigate });

    const { user } = setupComponent(component);
    const { getByTestId } = screen;
    await user.press(getByTestId(testIds.trxListPage.trxItem(mockTransaction.id)));

    expect(navigate).toHaveBeenCalledWith({
      pathname: `/transaction/[id]`,
      params: mockTransaction,
    });
  });

  it('should display correct status marker color for PENDING status', () => {
    setupComponent(component);
    const { getByTestId } = screen;
    const statusMarker = getByTestId(testIds.trxListPage.statusMarker);
    expect(statusMarker.props.className).toMatch(/bg-primary/i);
  });

  it('should display correct status marker color for SUCCESS status', () => {
    setupComponent(
      <TransactionListItem
        transaction={{
          ...mockTransaction,
          status: 'SUCCESS',
        }}
      />,
    );
    const { getByTestId } = screen;
    const statusMarker = getByTestId(testIds.trxListPage.statusMarker);

    expect(statusMarker.props.className).toMatch('bg-green-500');
  });
});
