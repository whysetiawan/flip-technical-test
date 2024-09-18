import type { TransactionDto } from '#/modules/transaction/data/api/transactionDto';
import type { Transaction } from '#/modules/transaction/domain/entities/transaction';
import transaction from '#/modules/transaction/domain/entities/transaction';

export const mapTransactionListResponse = (
  data: TransactionDto.TransactionResponse,
): Transaction[] => {
  return Object.values(data).map((item) => {
    return transaction.create({
      accountNumber: item.account_number,
      amount: item.amount,
      beneficiaryBank: item.beneficiary_bank,
      beneficiaryName: item.beneficiary_name,
      completedAt: item.completed_at,
      createdAt: item.created_at,
      fee: item.fee,
      id: item.id,
      remark: item.remark,
      senderBank: item.sender_bank,
      status: item.status,
      uniqueCode: item.unique_code,
    });
  });
};
