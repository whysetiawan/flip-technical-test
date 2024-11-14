import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, userEvent, waitFor } from '@testing-library/react-native';
import type { PropsWithChildren } from 'react';

import TransactionListPage from '../TransactionListPage';

import { MOCK_TRANSACTIONS_RESPONSE } from '#/modules/transaction/data/api/transactionApiMock';
import { mapTransactionListResponse } from '#/modules/transaction/data/api/transactionMapper';
import { testIds } from '#/shared/constants/testIds';

const mockQueryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
      gcTime: 0,
    },
    queries: {
      retry: false,
      gcTime: 0,
      staleTime: 0,
    },
  },
});

const MockQueryClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={mockQueryClient}>{children}</QueryClientProvider>;
};

const setupComponent = (jsx: React.ReactElement<any>) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};

const DATA_TO_EXPECT = mapTransactionListResponse(MOCK_TRANSACTIONS_RESPONSE);

describe('TransactionListPage', () => {
  it('should render correctly', async () => {
    setupComponent(
      <MockQueryClientProvider>
        <TransactionListPage />
      </MockQueryClientProvider>,
    );
    const { getByTestId } = screen;

    expect(getByTestId(testIds.trxListPage.searchInput)).toBeOnTheScreen();
    expect(getByTestId(testIds.trxListPage.sortButton)).toBeOnTheScreen();
    expect(getByTestId(testIds.trxListPage.list)).toBeOnTheScreen();

    // assert skeleton since the data is still fetching
    expect(getByTestId(testIds.trxListPage.shimmer(0))).toBeOnTheScreen();

    // wait for the data to be fetched
    await waitFor(() => {
      return expect(
        getByTestId(testIds.trxListPage.trxItem(DATA_TO_EXPECT[0].id)),
      ).toBeOnTheScreen();
    });
  });

  it('should render the correct data', async () => {
    setupComponent(
      <MockQueryClientProvider>
        <TransactionListPage />
      </MockQueryClientProvider>,
    );

    await waitFor(() => {
      return expect(screen.getByText(DATA_TO_EXPECT[0].beneficiaryName)).toBeOnTheScreen();
    });
  });
});
