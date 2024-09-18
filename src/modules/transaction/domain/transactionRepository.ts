import type { Transaction } from '#/modules/transaction/domain/entities/transaction';

export interface TransactionRepository {
  getTransactions(): Promise<Transaction[]>;
}
