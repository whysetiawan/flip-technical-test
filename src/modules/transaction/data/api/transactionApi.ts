import type { TransactionDto } from '#/modules/transaction/data/api/transactionDto';

export const getTransactions = async () => {
  const response = await fetch('https://recruitment-test.flip.id/frontend-test');
  return response.json() as unknown as TransactionDto.TransactionResponse;
};
