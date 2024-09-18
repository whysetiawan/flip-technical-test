import { getTransactions } from '#/modules/transaction/data/api/transactionApi';
import { mapTransactionListResponse } from '#/modules/transaction/data/api/transactionMapper';
import type { TransactionRepository } from '#/modules/transaction/domain/transactionRepository';

const transactionRepositoryImpl = (): TransactionRepository => {
  return {
    getTransactions: async () => {
      const res = await getTransactions();
      const transactions = mapTransactionListResponse(res);
      return transactions;
    },
  };
};

// make it a singleton
export default transactionRepositoryImpl();
