import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';

import { useTransactionsQuery } from '#/modules/transaction/application/hooks/useTransactionsQuery';
import { MOCK_TRANSACTIONS_RESPONSE } from '#/modules/transaction/data/api/transactionApiMock';
import { mapTransactionListResponse } from '#/modules/transaction/data/api/transactionMapper';
import type { Transaction } from '#/modules/transaction/domain/entities/transaction';

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

const DATA_TO_EXPECT = mapTransactionListResponse(MOCK_TRANSACTIONS_RESPONSE);

const filterFn = (q: string) => (item: Transaction) => {
  return (
    item.beneficiaryName.toLowerCase().includes(q.toLowerCase()) ||
    item.senderBank.toLowerCase().includes(q.toLowerCase()) ||
    item.beneficiaryBank.toLowerCase().includes(q.toLowerCase()) ||
    item.amount.toString().includes(q)
  );
};

describe('useTransactionsQuery', () => {
  it('should return the correct length data', async () => {
    const { result } = renderHook(() => useTransactionsQuery(undefined, 'none-asc'), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={mockQueryClient}>{children}</QueryClientProvider>
      ),
    });

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => {
      return expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data?.length).toEqual(DATA_TO_EXPECT.length);
  });

  it('should return the correct data when searchQuery is provided', async () => {
    const SEARCH_QUERY = 'Selin Dawe';
    const { result } = renderHook(() => useTransactionsQuery(SEARCH_QUERY, 'none-asc'), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={mockQueryClient}>{children}</QueryClientProvider>
      ),
    });

    const EXPECTATION = DATA_TO_EXPECT.filter(filterFn(SEARCH_QUERY));

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => {
      return expect(result.current.isSuccess).toBeTruthy();
    });
    expect(result.current.data?.length).toEqual(EXPECTATION.length);
  });

  it('should return the correct data when selectedSort by name-desc is provided', async () => {
    const { result } = renderHook(() => useTransactionsQuery('', 'name-desc'), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={mockQueryClient}>{children}</QueryClientProvider>
      ),
    });

    const EXPECTATION = DATA_TO_EXPECT.toSorted((a, b) =>
      b.beneficiaryName.localeCompare(a.beneficiaryName),
    );

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => {
      return expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data?.length).toEqual(EXPECTATION.length);
  });

  it('should return the correct data when selectedSort by name-date is provided', async () => {
    const { result } = renderHook(() => useTransactionsQuery('', 'date-desc'), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={mockQueryClient}>{children}</QueryClientProvider>
      ),
    });

    const EXPECTATION = DATA_TO_EXPECT.toSorted(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => {
      return expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data?.length).toEqual(EXPECTATION.length);
  });

  it('should return the correct data when both searchQuery and selectedSort are provided', async () => {
    const SEARCH_QUERY = 'Sufyan Kramer';
    const { result } = renderHook(() => useTransactionsQuery(SEARCH_QUERY, 'name-desc'), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={mockQueryClient}>{children}</QueryClientProvider>
      ),
    });

    const EXPECTATION = DATA_TO_EXPECT.filter(filterFn(SEARCH_QUERY)).toSorted((a, b) =>
      b.beneficiaryName.localeCompare(a.beneficiaryName),
    );

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => {
      return expect(result.current.isSuccess).toBeTruthy();
    });
    expect(result.current.data?.length).toEqual(EXPECTATION.length);
  });
});
