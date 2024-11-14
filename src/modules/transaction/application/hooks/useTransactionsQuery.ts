import { useQuery } from '@tanstack/react-query';

import transactionRepositoryImpl from '#/modules/transaction/data/transactionRepositoryImpl';

type SortBy = 'name' | 'date' | 'none';
type Order = 'asc' | 'desc';

export const useTransactionsQuery = (searchQuery = '', sort: SortBy = 'none', order: Order) => {
  const query = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      return transactionRepositoryImpl.getTransactions();
    },

    select: (data) => {
      const filteredData = data.filter((item) => {
        return (
          item.beneficiaryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.senderBank.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.beneficiaryBank.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.amount.toString().includes(searchQuery)
        );
      });

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

      return {
        pages: filteredData,
      };
    },
  });

  return query;
};
