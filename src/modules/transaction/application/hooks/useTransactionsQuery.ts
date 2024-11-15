import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import transactionRepositoryImpl from '#/modules/transaction/data/transactionRepositoryImpl';
import type { Transaction } from '#/modules/transaction/domain/entities/transaction';

type Sort = 'name' | 'date' | 'none';
type Order = 'asc' | 'desc';

export type SortBy = `${Sort}-${Order}`;

export const useTransactionsQuery = (searchQuery = '', sortBy: SortBy) => {
  const [sort, order] = sortBy.split('-');
  const query = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      return transactionRepositoryImpl.getTransactions();
    },
    select: useCallback(
      (data: Transaction[]) => {
        if (!data) {
          return [];
        }
        let filteredData = data.slice();

        if (searchQuery) {
          filteredData = data.filter((item) => {
            return (
              item.beneficiaryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.senderBank.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.beneficiaryBank.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.amount.toString().includes(searchQuery)
            );
          });
        }

        if (sort === 'name') {
          filteredData.sort((a, b) => {
            if (order === 'asc') {
              return a.beneficiaryName.localeCompare(b.beneficiaryName);
            }
            return b.beneficiaryName.localeCompare(a.beneficiaryName);
          });
        }

        if (sort === 'date') {
          filteredData.sort((a, b) => {
            if (order === 'asc') {
              return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
        }

        return filteredData;
      },
      [order, searchQuery, sort],
    ),
  });

  return query;
};
