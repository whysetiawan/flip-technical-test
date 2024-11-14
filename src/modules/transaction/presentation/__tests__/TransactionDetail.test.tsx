import { render, screen, fireEvent, userEvent } from '@testing-library/react-native';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';

import '@testing-library/jest-native/extend-expect';

import TransactionDetail from '../TransactionDetail';

import { testIds } from '#/shared/constants/testIds';

jest.mock('expo-clipboard');
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(() => ({
    id: '12345',
    senderBank: 'Bank A',
    beneficiaryBank: 'Bank B',
    beneficiaryName: 'John Doe',
    accountNumber: '9876543210',
    remark: 'Payment for services',
    createdAt: '2023-10-01T12:34:56Z',
    amount: 100000,
    uniqueCode: 123,
  })),
}));

jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn(),
}));

const setupComponent = (jsx: React.ReactElement<any>) => {
  return {
    ...render(jsx),
    user: userEvent.setup(),
  };
};

describe('TransactionDetail', () => {
  const mockRouter = { back: jest.fn() };
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('should render transaction details correctly', () => {
    render(<TransactionDetail />);

    expect(screen.getByText(/ID TRANSAKSI: #12345/)).toBeTruthy();
    expect(screen.getByText(/DETAIL TRANSAKSI/)).toBeTruthy();
    expect(screen.getByText(/Bank A/)).toBeTruthy();
    expect(screen.getByText(/Bank B/)).toBeTruthy();
    expect(screen.getByTestId(testIds.trxDetailPage.beneficiaryName).props.children).toBe(
      'JOHN DOE',
    );
    expect(screen.getByTestId(testIds.trxDetailPage.accountNumber).props.children).toBe(
      '9876543210',
    );
    expect(screen.getByTestId(testIds.trxDetailPage.remark).props.children).toBe(
      'Payment for services',
    );
    expect(screen.getByTestId(testIds.trxDetailPage.createdAt).props.children).toBe(
      '1 Oktober 2023',
    );
    expect(screen.getByTestId(testIds.trxDetailPage.amount).props.children).toBe('Rp100.000');
    expect(screen.getByTestId(testIds.trxDetailPage.uniqueCode).props.children).toBe(123);
  });

  it('should copy transaction ID to clipboard and show toast/alert', async () => {
    const spy = jest.spyOn(Clipboard, 'setStringAsync').mockImplementation(jest.fn());
    render(<TransactionDetail />);

    const copyButton = screen.getByTestId(testIds.trxDetailPage.copyTrxIdButton);
    fireEvent.press(copyButton);

    expect(spy).toHaveBeenCalledWith('12345');
    // Add more assertions for ToastAndroid or Alert based on the platform
  });

  it('should navigate back when close button is pressed', async () => {
    const { user } = setupComponent(<TransactionDetail />);

    const closeButton = screen.getByTestId(testIds.trxDetailPage.closeButton);
    await user.press(closeButton);

    expect(mockRouter.back).toHaveBeenCalled();
  });
});
