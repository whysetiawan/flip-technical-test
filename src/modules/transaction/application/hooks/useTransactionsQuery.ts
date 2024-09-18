import { useInfiniteQuery } from '@tanstack/react-query';

import transactionRepositoryImpl from '#/modules/transaction/data/transactionRepositoryImpl';

export const useTransactionsQuery = () => {
  const query = useInfiniteQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      return transactionRepositoryImpl.getTransactions();
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (lastPage?.length > 0) {
        return lastPage[lastPage.length - 1].id;
      }
      return null;
    },
  });

  return query;
};
